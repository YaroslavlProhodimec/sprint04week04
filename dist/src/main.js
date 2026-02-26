"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        exceptionFactory: (errors) => {
            const errorsMessages = errors
                .filter((e) => {
                if (!e.constraints)
                    return true;
                const messages = Object.values(e.constraints);
                return !messages.some((msg) => typeof msg === 'string' && msg.includes('should not exist'));
            })
                .map((e) => ({
                message: e.constraints ? Object.values(e.constraints)[0] : 'Validation failed',
                field: e.property,
            }));
            return new common_1.BadRequestException({ errorsMessages });
        },
    }));
    await app.listen(3001);
    console.log('🚀 Сервер запущен на http://localhost:3001');
    console.log('   Маршруты: /blogs, /posts, /users, /testing/all-data');
}
bootstrap();
//# sourceMappingURL=main.js.map