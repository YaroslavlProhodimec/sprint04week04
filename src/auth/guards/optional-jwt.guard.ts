import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { jwtService } from '../../application/jwt-service';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';

@Injectable()
export class OptionalJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return true;
    }

    try {
      const token = authHeader.slice(7);
      const payload = await jwtService.getJwtPayloadResult(
        token,
        ACCESS_TOKEN_SECRET,
      );

      if (payload?.userId) {
        request.user = { userId: payload.userId };
      }
    } catch {
      // ignore invalid token - user stays unauthenticated
    }

    return true;
  }
}
