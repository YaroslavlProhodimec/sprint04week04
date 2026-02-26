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
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
            const errorsMessages = [];
            for (const e of errors) {
                if (!e.constraints)
                    continue;
                const constraintKeys = Object.keys(e.constraints);
                const constraintValues = Object.values(e.constraints);
                const isWhitelistError = constraintKeys.includes('whitelistValidation') ||
                    constraintValues.some((msg) => typeof msg === 'string' && msg.includes('should not exist'));
                if (isWhitelistError)
                    continue;
                errorsMessages.push({
                    message: constraintValues[0],
                    field: e.property,
                });
            }
            return new common_1.BadRequestException({ errorsMessages });
        },
    }));
    await app.listen(3001);
    console.log('🚀 Сервер запущен на http://localhost:3001');
    console.log('   Маршруты: /blogs, /posts, /users, /testing/all-data');
}
bootstrap();
//# sourceMappingURL=main.js.map