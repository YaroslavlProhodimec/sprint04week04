"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const blogs_module_1 = require("./blogs/blogs.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const posts_module_1 = require("./posts/posts.module");
const comments_module_1 = require("./comments/comments.module");
const testing_module_1 = require("./testing/testing.module");
const blog_repository_1 = require("./repositories/blog-repository");
const blogs_repository_1 = require("./blogs/blogs.repository");
let AppModule = class AppModule {
    blogsRepository;
    constructor(blogsRepository) {
        this.blogsRepository = blogsRepository;
    }
    onModuleInit() {
        (0, blog_repository_1.setBlogsRepository)(this.blogsRepository);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.VERCEL ? undefined : '.env',
                ignoreEnvFile: !!process.env.VERCEL,
            }),
            database_module_1.DatabaseModule,
            blogs_module_1.BlogsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            testing_module_1.TestingModule,
        ],
    }),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository])
], AppModule);
//# sourceMappingURL=app.module.js.map