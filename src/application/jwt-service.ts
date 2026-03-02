import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import { JwtPayloadResult } from '../dto/common/jwt/JwtPayloadResult';

type JwtPayload = {
  userId: string;
  deviceId?: string;
};

export const jwtService = {
  async createJWT(
    payload: JwtPayload,
    secret: string,
    expiresIn: number, // секунды
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { ...payload },
        secret,
        { expiresIn },
        (err: Error | null, token?: string) => {
          if (err) reject(err);
          else resolve(token!);
        },
      );
    });
  },

  async getJwtPayloadResult(
    token: string,
    secret: string,
  ): Promise<JwtPayloadResult | null> {
    try {
      const result = jwt.verify(token, secret);
      return result as JwtPayloadResult;
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError ||
        error instanceof NotBeforeError
        // error instanceof NotBeforeError/
      ) {
        return null;
      }
      return null;
    }
  },
};
