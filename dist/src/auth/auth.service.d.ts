import { EmailService } from '../common/email/email.service';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private emailService;
    constructor(usersService: UsersService, emailService: EmailService);
    register(login: string, email: string, password: string): Promise<void>;
    confirmCode(code: string): Promise<void>;
    resendEmail(email: string): Promise<void>;
    login(loginOrEmail: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<{
        email: string;
        login: string;
        userId: string;
    } | null>;
    passwordRecovery(email: string): Promise<void>;
    newPassword(recoveryCode: string, newPassword: string): Promise<void>;
}
