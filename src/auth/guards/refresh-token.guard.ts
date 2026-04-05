import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtService } from '../../application/jwt-service';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await jwtService.getJwtPayloadResult(
      refreshToken,
      REFRESH_TOKEN_SECRET,
    );

    if (!payload?.userId || !payload?.deviceId) {
      throw new UnauthorizedException();
    }

    request.user = {
      userId: payload.userId,
      deviceId: payload.deviceId,
      iat: payload.iat,
    };
    return true;
  }
}
