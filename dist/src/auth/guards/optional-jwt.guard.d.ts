import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class OptionalJwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
