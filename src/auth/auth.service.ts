import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { jwtService } from '../application/jwt-service';
import { add } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '../common/email/email.service';
import { UsersService } from '../users/users.service';
import type { UserDocument } from '../schemas/user.schema';

function toUserId(user: UserDocument): string {
  return String((user as any)._id);
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailService: EmailService,
  ) {}

  async register(login: string, email: string, password: string) {
    const [existingByEmail, existingByLogin] = await Promise.all([
      this.usersService.findByEmail(email),
      this.usersService.findByLogin(login),
    ]);
    if (existingByLogin || existingByEmail) {
      const errorsMessages: { message: string; field: string }[] = [];
      if (existingByLogin) errorsMessages.push({ message: 'User with this login already exists', field: 'login' });
      if (existingByEmail) errorsMessages.push({ message: 'User with this email already exists', field: 'email' });
      throw new BadRequestException({ errorsMessages });
    }

    const confirmationCode = uuidv4();
    const expirationDate = add(new Date(), { hours: 3, minutes: 3 });

    const created = await this.usersService.createForRegistration(
      login,
      email,
      password,
      confirmationCode,
      expirationDate,
    );

    try {
      await this.emailService.sendConfirmationEmail(email, confirmationCode);
    } catch (e) {
      await this.usersService.deleteById(toUserId(created));2
      throw new BadRequestException({ errorsMessages: [{ message: 'Registration failed', field: 'email' }] });
    }
  }

  async confirmCode(code: string): Promise<void> {
    const user = await this.usersService.findByConfirmationCode(code);
    const emailConf = user?.emailConfirmation;
    if (!user || !emailConf || emailConf.confirmationCode !== code) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Incorrect confirmation code', field: 'code' }] });
    }
    if (emailConf.isConfirmed) {
      throw new BadRequestException({ errorsMessages: [{ message: 'User is already confirmed', field: 'code' }] });
    }
    if (emailConf.expirationDate && new Date(emailConf.expirationDate) < new Date()) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Confirmation code expired', field: 'code' }] });
    }
    const updated = await this.usersService.confirmUser(toUserId(user));
    if (!updated) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Update failed', field: 'code' }] });
    }
  }

  async resendEmail(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Wrong email', field: 'email' }] });
    }
    const isConfirmed = user.emailConfirmation?.isConfirmed ?? user.isConfirmed ?? false;
    if (isConfirmed) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Email already confirmed', field: 'email' }] });
    }
    const newCode = uuidv4();
    const newExpirationDate = add(new Date(), { hours: 3, minutes: 3 });
    await this.usersService.updateConfirmationCode(toUserId(user), newCode, newExpirationDate);
    await this.emailService.sendConfirmationEmail(user.accountData.email, newCode);
  }

  async login(loginOrEmail: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.checkCredentials(loginOrEmail, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessSecret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
    const [accessToken, refreshToken] = await Promise.all([
      jwtService.createJWT({ userId: toUserId(user) }, accessSecret, 300), // 5 мин
      jwtService.createJWT({ userId: toUserId(user) }, refreshSecret, 604800), // 7 дней
    ]);
    return { accessToken, refreshToken };
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) return null;
    return {
      email: user.accountData.email,
      login: user.accountData.login,
      userId: toUserId(user),
    };
  }

  async  passwordRecovery(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const recoveryCode = uuidv4();
      const expirationDate = add(new Date(), { hours: 24 });
      await this.usersService.setRecoveryCode(toUserId(user), recoveryCode, expirationDate);
      const link = `https://somesite.com/password-recovery?recoveryCode=${recoveryCode}`;
      await this.emailService.sendPasswordRecoveryEmail(email, link);
    }
    // Always 204
  }

  async newPassword(recoveryCode: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByRecoveryCode(recoveryCode);
    if (!user) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Recovery code is incorrect', field: 'recoveryCode' }] });
    }
    if (user.recoveryCodeExpiration && new Date(user.recoveryCodeExpiration) < new Date()) {
      throw new BadRequestException({ errorsMessages: [{ message: 'Recovery code expired', field: 'recoveryCode' }] });
    }
    await this.usersService.setNewPassword(toUserId(user), newPassword);
  }

}
