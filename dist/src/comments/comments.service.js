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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comments_repository_1 = require("./comments.repository");
const posts_repository_1 = require("../posts/posts.repository");
const users_repository_1 = require("../users/users.repository");
let CommentsService = class CommentsService {
    commentsRepository;
    postsRepository;
    usersRepository;
    constructor(commentsRepository, postsRepository, usersRepository) {
        this.commentsRepository = commentsRepository;
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
    }
    async createComment(postId, content, userId) {
        const post = await this.postsRepository.getPostById(postId);
        if (!post) {
            throw new common_1.NotFoundException();
        }
        const userLogin = await this.usersRepository.getLoginByUserId(userId);
        if (!userLogin) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.commentsRepository.createComment(postId, content, userId, userLogin);
    }
    async getCommentById(id, userId) {
        return this.commentsRepository.getCommentById(id, userId);
    }
    async getCommentsByPostId(postId, query, userId) {
        const post = await this.postsRepository.getPostById(postId);
        if (!post) {
            throw new common_1.NotFoundException();
        }
        return this.commentsRepository.getCommentsByPostId(postId, query, userId);
    }
    async updateComment(commentId, content, userId) {
        const comment = await this.commentsRepository.findCommentByIdRaw(commentId);
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        if (comment.commentatorInfo.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        await this.commentsRepository.updateComment(commentId, content);
    }
    async deleteComment(commentId, userId) {
        const comment = await this.commentsRepository.findCommentByIdRaw(commentId);
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        if (comment.commentatorInfo.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        await this.commentsRepository.deleteComment(commentId);
    }
    async setCommentLikeStatus(commentId, userId, likeStatus) {
        const comment = await this.commentsRepository.findCommentByIdRaw(commentId);
        if (!comment) {
            throw new common_1.NotFoundException();
        }
        if (likeStatus === 'None') {
            await this.commentsRepository.removeLike(commentId, userId);
        }
        else {
            await this.commentsRepository.setLike(commentId, userId, likeStatus);
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        posts_repository_1.PostsRepository,
        users_repository_1.UsersRepository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map