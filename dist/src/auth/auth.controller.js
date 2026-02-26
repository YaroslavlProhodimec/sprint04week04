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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const confirm_code_dto_1 = require("./dto/confirm-code.dto");
const resend_email_dto_1 = require("./dto/resend-email.dto");
const password_recovery_dto_1 = require("./dto/password-recovery.dto");
const new_password_dto_1 = require("./dto/new-password.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const user_id_decorator_1 = require("./decorators/user-id.decorator");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        await this.authService.register(dto.login, dto.email, dto.password);
    }
    async confirmCode(dto) {
        await this.authService.confirmCode(dto.code);
    }
    async resendEmail(dto) {
        await this.authService.resendEmail(dto.email);
    }
    async login(dto, res) {
        const { accessToken } = await this.authService.login(dto.loginOrEmail, dto.password);
        res.cookie('refreshToken', 'refresh-token-stub', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { accessToken };
    }
    async me(userId) {
        const me = await this.authService.getMe(userId);
        if (!me)
            throw new common_1.UnauthorizedException();
        return me;
    }
    async passwordRecovery(dto) {
        await this.authService.passwordRecovery(dto.email);
    }
    async newPassword(dto) {
        await this.authService.newPassword(dto.recoveryCode, dto.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('registration-confirmation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_code_dto_1.ConfirmCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmCode", null);
__decorate([
    (0, common_1.Post)('registration-email-resending'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_email_dto_1.ResendEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendEmail", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('password-recovery'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_recovery_dto_1.PasswordRecoveryDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "passwordRecovery", null);
__decorate([
    (0, common_1.Post)('new-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "newPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map