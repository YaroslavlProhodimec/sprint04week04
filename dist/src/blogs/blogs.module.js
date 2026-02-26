"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_repository_1 = require("./blogs.repository");
const blog_schema_1 = require("../schemas/blog.schema");
const blog_controller_1 = require("./blog.controller");
const blog_service_1 = require("./blog.service");
const posts_module_1 = require("../posts/posts.module");
const auth_module_1 = require("../auth/auth.module");
let BlogsModule = class BlogsModule {
};
exports.BlogsModule = BlogsModule;
exports.BlogsModule = BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema }
            ]),
            (0, common_1.forwardRef)(() => posts_module_1.PostsModule),
            auth_module_1.AuthModule,
        ],
        controllers: [blog_controller_1.BlogsController],
        providers: [blog_service_1.BlogsService, blogs_repository_1.BlogsRepository],
        exports: [blog_service_1.BlogsService, blogs_repository_1.BlogsRepository],
    })
], BlogsModule);
//# sourceMappingURL=blogs.module.js.map