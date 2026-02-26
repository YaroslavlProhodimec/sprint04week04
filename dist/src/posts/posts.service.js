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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const posts_repository_1 = require("./posts.repository");
const post_likes_repository_1 = require("../post-likes/post-likes.repository");
let PostsService = class PostsService {
    postsRepository;
    postLikesRepository;
    constructor(postsRepository, postLikesRepository) {
        this.postsRepository = postsRepository;
        this.postLikesRepository = postLikesRepository;
    }
    async getAllPosts(query, userId) {
        return this.postsRepository.getPosts(query, userId);
    }
    async getPostById(id, userId) {
        return this.postsRepository.getPostById(id, userId);
    }
    async createPost(createPostDto) {
        return this.postsRepository.createPost(createPostDto);
    }
    async updatePost(id, updatePostDto) {
        return this.postsRepository.updatePost(id, updatePostDto);
    }
    async deletePost(id) {
        return this.postsRepository.deletePost(id);
    }
    async getBlogPosts(blogId, query, userId) {
        return this.postsRepository.getBlogPosts(blogId, query, userId);
    }
    async createPostForBlog(blogId, postData) {
        return this.postsRepository.createPostForBlog(blogId, postData);
    }
    async setPostLikeStatus(postId, userId, likeStatus) {
        const post = await this.postsRepository.getPostById(postId);
        if (!post) {
            throw new common_1.NotFoundException();
        }
        if (likeStatus === 'None') {
            await this.postLikesRepository.removeLike(postId, userId);
        }
        else {
            await this.postLikesRepository.setLike(postId, userId, likeStatus);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        post_likes_repository_1.PostLikesRepository])
], PostsService);
//# sourceMappingURL=posts.service.js.map