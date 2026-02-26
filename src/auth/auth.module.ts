import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { OptionalJwtGuard } from './guards/optional-jwt.guard';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../common/email/email.module';

@Module({
  imports: [UsersModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, BasicAuthGuard, JwtAuthGuard, OptionalJwtGuard],
  exports: [AuthService, BasicAuthGuard, JwtAuthGuard, OptionalJwtGuard],
})
export class AuthModule {}
