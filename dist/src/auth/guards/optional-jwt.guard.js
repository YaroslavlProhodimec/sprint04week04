"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../../application/jwt-service");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
let OptionalJwtGuard = class OptionalJwtGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return true;
        }
        try {
            const token = authHeader.slice(7);
            const payload = await jwt_service_1.jwtService.getJwtPayloadResult(token, ACCESS_TOKEN_SECRET);
            if (payload?.userId) {
                request.user = { userId: payload.userId };
            }
        }
        catch {
        }
        return true;
    }
};
exports.OptionalJwtGuard = OptionalJwtGuard;
exports.OptionalJwtGuard = OptionalJwtGuard = __decorate([
    (0, common_1.Injectable)()
], OptionalJwtGuard);
//# sourceMappingURL=optional-jwt.guard.js.map