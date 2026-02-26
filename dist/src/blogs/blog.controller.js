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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const create_blog_dto_1 = require("../dto/blogsDTO/create-blog.dto");
const create_post_for_blog_dto_1 = require("../dto/postsDTO/create-post-for-blog.dto");
const basic_auth_guard_1 = require("../auth/guards/basic-auth.guard");
const optional_jwt_guard_1 = require("../auth/guards/optional-jwt.guard");
let BlogsController = class BlogsController {
    blogsService;
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async getBlogs(query) {
        try {
            const blogs = await this.blogsService.getAllBlogs(query);
            return blogs;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to get blogs');
        }
    }
    async getBlog(id) {
        const blog = await this.blogsService.getBlogById(id);
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        return blog;
    }
    async createBlog(createBlogDto) {
        return this.blogsService.createBlog(createBlogDto);
    }
    async updateBlog(id, updateBlogDto) {
        const updated = await this.blogsService.updateBlog(id, updateBlogDto);
        if (!updated) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
    }
    async deleteBlog(id) {
        const deleted = await this.blogsService.deleteBlog(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
    }
    async getBlogPosts(id, query, req) {
        const sortData = {
            sortBy: query.sortBy,
            sortDirection: query.sortDirection,
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
        };
        const userId = req.user?.userId;
        const posts = await this.blogsService.getPostsByBlogId(id, sortData, userId);
        if (!posts || posts.items.length < 1) {
            throw new common_1.NotFoundException('Posts not found');
        }
        return posts;
    }
    async createPostForBlog(blogId, postData) {
        const blog = await this.blogsService.getBlogById(blogId);
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${blogId} not found`);
        }
        const newPost = await this.blogsService.createPostForBlog(blogId, postData);
        return newPost;
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlog", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Get)(':id/posts'),
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogPosts", null);
__decorate([
    (0, common_1.Post)(':id/posts'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_for_blog_dto_1.CreatePostForBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createPostForBlog", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blog.controller.js.map