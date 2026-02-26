import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { NewPasswordDto } from './dto/new-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<void>;
    confirmCode(dto: ConfirmCodeDto): Promise<void>;
    resendEmail(dto: ResendEmailDto): Promise<void>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
    }>;
    me(userId: string): Promise<{
        email: string;
        login: string;
        userId: string;
    }>;
    passwordRecovery(dto: PasswordRecoveryDto): Promise<void>;
    newPassword(dto: NewPasswordDto): Promise<void>;
}
