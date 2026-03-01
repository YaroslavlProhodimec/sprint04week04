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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const optional_jwt_guard_1 = require("../auth/guards/optional-jwt.guard");
const user_id_decorator_1 = require("../auth/decorators/user-id.decorator");
const like_status_dto_1 = require("../dto/postsDTO/like-status.dto");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts(query, req) {
        try {
            const userId = req.user?.userId;
            const posts = await this.postsService.getAllPosts(query, userId);
            return posts;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to get posts');
        }
    }
    async getPost(id, req) {
        const userId = req.user?.userId;
        const post = await this.postsService.getPostById(id, userId);
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }
    async setPostLikeStatus(postId, dto, userId) {
        await this.postsService.setPostLikeStatus(postId, userId, dto.likeStatus);
    }
    async createPost(createPostDto) {
        try {
            const newPost = await this.postsService.createPost(createPostDto);
            return newPost;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to create post');
        }
    }
    async updatePost(id, updatePostDto) {
        try {
            const updated = await this.postsService.updatePost(id, updatePostDto);
            if (!updated) {
                throw new common_1.NotFoundException(`Post with ID ${id} not found`);
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message || 'Failed to update post');
        }
    }
    async deletePost(id) {
        const deleted = await this.postsService.deletePost(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(optional_jwt_guard_1.OptionalJwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.Put)(':postId/like-status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, like_status_dto_1.LikeStatusDto, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "setPostLikeStatus", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map