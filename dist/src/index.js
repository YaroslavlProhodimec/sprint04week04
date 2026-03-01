"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express_1 = __importDefault(require("express"));
const common_1 = require("@nestjs/common");
let cachedApp;
async function createApp() {
    if (cachedApp) {
        return cachedApp;
    }
    try {
        const expressApp = (0, express_1.default)();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
            logger: ['error', 'warn', 'log'],
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                const errorsMessages = errors.map((e) => ({
                    message: e.constraints ? Object.values(e.constraints)[0] : 'Validation failed',
                    field: e.property,
                }));
                return new common_1.BadRequestException({ errorsMessages });
            },
        }));
        expressApp.get('/', (req, res) => {
            res.json({
                message: 'API is running',
                version: '1.0.0',
                endpoints: {
                    blogs: '/blogs',
                    posts: '/posts',
                    users: '/users',
                    testing: '/testing/all-data'
                }
            });
        });
        await app.init();
        cachedApp = expressApp;
        return expressApp;
    }
    catch (error) {
        console.error('Error creating NestJS app:', error);
        throw error;
    }
}
async function handler(req, res) {
    try {
        const app = await createApp();
        return app(req, res);
    }
    catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
//# sourceMappingURL=index.js.map