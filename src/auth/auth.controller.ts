import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserId } from './decorators/user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto.login, dto.email, dto.password);
  }

  @Post('registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmCode(@Body() dto: ConfirmCodeDto) {
    await this.authService.confirmCode(dto.code);
  }

  @Post('registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendEmail(@Body() dto: ResendEmailDto) {
    await this.authService.resendEmail(dto.email);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(dto.loginOrEmail, dto.password);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { accessToken };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@UserId() userId: string) {
    const me = await this.authService.getMe(userId);
    if (!me) throw new UnauthorizedException();
    return me;
  }

  @Post('password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  async passwordRecovery(@Body() dto: PasswordRecoveryDto) {
    await this.authService.passwordRecovery(dto.email);
  }

  @Post('new-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async newPassword(@Body() dto: NewPasswordDto) {
    await this.authService.newPassword(dto.recoveryCode, dto.newPassword);
  }
}
