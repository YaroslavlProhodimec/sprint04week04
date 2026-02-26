"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../application/jwt-service");
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const email_service_1 = require("../common/email/email.service");
const users_service_1 = require("../users/users.service");
function toUserId(user) {
    return String(user._id);
}
let AuthService = class AuthService {
    usersService;
    emailService;
    constructor(usersService, emailService) {
        this.usersService = usersService;
        this.emailService = emailService;
    }
    async register(login, email, password) {
        const [existingByEmail, existingByLogin] = await Promise.all([
            this.usersService.findByEmail(email),
            this.usersService.findByLogin(login),
        ]);
        if (existingByLogin || existingByEmail) {
            const errorsMessages = [];
            if (existingByLogin)
                errorsMessages.push({ message: 'User with this login already exists', field: 'login' });
            if (existingByEmail)
                errorsMessages.push({ message: 'User with this email already exists', field: 'email' });
            throw new common_1.BadRequestException({ errorsMessages });
        }
        const confirmationCode = (0, uuid_1.v4)();
        const expirationDate = (0, date_fns_1.add)(new Date(), { hours: 3, minutes: 3 });
        const created = await this.usersService.createForRegistration(login, email, password, confirmationCode, expirationDate);
        try {
            await this.emailService.sendConfirmationEmail(email, confirmationCode);
        }
        catch (e) {
            await this.usersService.deleteById(toUserId(created));
            2;
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Registration failed', field: 'email' }] });
        }
    }
    async confirmCode(code) {
        const user = await this.usersService.findByConfirmationCode(code);
        const emailConf = user?.emailConfirmation;
        if (!user || !emailConf || emailConf.confirmationCode !== code) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Incorrect confirmation code', field: 'code' }] });
        }
        if (emailConf.isConfirmed) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'User is already confirmed', field: 'code' }] });
        }
        if (emailConf.expirationDate && new Date(emailConf.expirationDate) < new Date()) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Confirmation code expired', field: 'code' }] });
        }
        const updated = await this.usersService.confirmUser(toUserId(user));
        if (!updated) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Update failed', field: 'code' }] });
        }
    }
    async resendEmail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Wrong email', field: 'email' }] });
        }
        const isConfirmed = user.emailConfirmation?.isConfirmed ?? user.isConfirmed ?? false;
        if (isConfirmed) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Email already confirmed', field: 'email' }] });
        }
        const newCode = (0, uuid_1.v4)();
        const newExpirationDate = (0, date_fns_1.add)(new Date(), { hours: 3, minutes: 3 });
        await this.usersService.updateConfirmationCode(toUserId(user), newCode, newExpirationDate);
        await this.emailService.sendConfirmationEmail(user.accountData.email, newCode);
    }
    async login(loginOrEmail, password) {
        const user = await this.usersService.checkCredentials(loginOrEmail, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const secret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
        const accessToken = await jwt_service_1.jwtService.createJWT({ userId: toUserId(user) }, secret, 300);
        return { accessToken };
    }
    async getMe(userId) {
        const user = await this.usersService.findById(userId);
        if (!user)
            return null;
        return {
            email: user.accountData.email,
            login: user.accountData.login,
            userId: toUserId(user),
        };
    }
    async passwordRecovery(email) {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const recoveryCode = (0, uuid_1.v4)();
            const expirationDate = (0, date_fns_1.add)(new Date(), { hours: 24 });
            await this.usersService.setRecoveryCode(toUserId(user), recoveryCode, expirationDate);
            const link = `https://somesite.com/password-recovery?recoveryCode=${recoveryCode}`;
            await this.emailService.sendPasswordRecoveryEmail(email, link);
        }
    }
    async newPassword(recoveryCode, newPassword) {
        const user = await this.usersService.findByRecoveryCode(recoveryCode);
        if (!user) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Recovery code is incorrect', field: 'recoveryCode' }] });
        }
        if (user.recoveryCodeExpiration && new Date(user.recoveryCodeExpiration) < new Date()) {
            throw new common_1.BadRequestException({ errorsMessages: [{ message: 'Recovery code expired', field: 'recoveryCode' }] });
        }
        await this.usersService.setNewPassword(toUserId(user), newPassword);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map