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
exports.CommentsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("../schemas/comment.schema");
const commentLike_schema_1 = require("../schemas/commentLike.schema");
const uuid_1 = require("uuid");
const mapper_1 = require("../types/comments/mapper");
let CommentsRepository = class CommentsRepository {
    commentModel;
    commentLikeModel;
    constructor(commentModel, commentLikeModel) {
        this.commentModel = commentModel;
        this.commentLikeModel = commentLikeModel;
    }
    async createComment(postId, content, userId, userLogin) {
        const commentData = {
            id: (0, uuid_1.v4)(),
            content,
            commentatorInfo: {
                userId,
                userLogin,
            },
            postId,
            createdAt: new Date().toISOString(),
        };
        const newComment = new this.commentModel(commentData);
        await newComment.save();
        return (0, mapper_1.commentsMapper)(newComment, 'None', 0, 0);
    }
    async getCommentById(id, userId) {
        const comment = await this.commentModel.findOne({ id }).exec();
        if (!comment)
            return null;
        const [likesCount, dislikesCount] = await Promise.all([
            this.countByCommentAndStatus(id, 'Like'),
            this.countByCommentAndStatus(id, 'Dislike'),
        ]);
        let myStatus = 'None';
        if (userId) {
            const status = await this.findMyStatus(id, userId);
            if (status)
                myStatus = status;
        }
        return (0, mapper_1.commentsMapper)(comment, myStatus, likesCount, dislikesCount);
    }
    async getCommentsByPostId(postId, query = {}, userId) {
        const { sortBy = 'createdAt', sortDirection = 'desc', pageNumber = 1, pageSize = 10, } = query;
        const comments = await this.commentModel
            .find({ postId })
            .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .exec();
        const totalCount = await this.commentModel.countDocuments({ postId });
        const pagesCount = Math.ceil(totalCount / +pageSize);
        const items = await Promise.all(comments.map(async (comment) => {
            const commentId = comment.id;
            const [likesCount, dislikesCount] = await Promise.all([
                this.countByCommentAndStatus(commentId, 'Like'),
                this.countByCommentAndStatus(commentId, 'Dislike'),
            ]);
            let myStatus = 'None';
            if (userId) {
                const status = await this.findMyStatus(commentId, userId);
                if (status)
                    myStatus = status;
            }
            return (0, mapper_1.commentsMapper)(comment, myStatus, likesCount, dislikesCount);
        }));
        return {
            pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount,
            items,
        };
    }
    async updateComment(id, content) {
        const result = await this.commentModel.updateOne({ id }, { content }).exec();
        return result.matchedCount === 1;
    }
    async deleteComment(id) {
        const result = await this.commentModel.deleteOne({ id }).exec();
        return result.deletedCount === 1;
    }
    async countByCommentAndStatus(commentId, likeStatus) {
        return this.commentLikeModel.countDocuments({ commentId, likeStatus }).exec();
    }
    async findMyStatus(commentId, userId) {
        const like = await this.commentLikeModel.findOne({ commentId, userId }).exec();
        return like?.likeStatus ?? null;
    }
    async setLike(commentId, userId, likeStatus) {
        await this.commentLikeModel.updateOne({ commentId, userId }, { $set: { commentId, userId, likeStatus, addedAt: new Date() } }, { upsert: true }).exec();
    }
    async removeLike(commentId, userId) {
        await this.commentLikeModel.deleteOne({ commentId, userId }).exec();
    }
    async findCommentByIdRaw(id) {
        return this.commentModel.findOne({ id }).exec();
    }
};
exports.CommentsRepository = CommentsRepository;
exports.CommentsRepository = CommentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(commentLike_schema_1.CommentLike.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentsRepository);
//# sourceMappingURL=comments.repository.js.map