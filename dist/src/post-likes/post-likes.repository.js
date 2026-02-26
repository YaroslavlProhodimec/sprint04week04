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
exports.PostLikesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const postLike_schema_1 = require("../schemas/postLike.schema");
let PostLikesRepository = class PostLikesRepository {
    postLikeModel;
    constructor(postLikeModel) {
        this.postLikeModel = postLikeModel;
    }
    async countByPostAndStatus(postId, likeStatus) {
        return this.postLikeModel
            .countDocuments({ postId, likeStatus })
            .exec();
    }
    async findMyStatus(postId, userId) {
        const like = await this.postLikeModel
            .findOne({ postId, userId: userId.toString() })
            .exec();
        return like?.likeStatus ?? null;
    }
    async findNewestLikes(postId, limit = 3) {
        const likes = await this.postLikeModel
            .find({ postId, likeStatus: 'Like' })
            .sort({ addedAt: -1 })
            .limit(limit)
            .lean()
            .exec();
        return likes.map((l) => ({
            userId: l.userId,
            addedAt: l.addedAt instanceof Date ? l.addedAt : new Date(l.addedAt),
        }));
    }
    async setLike(postId, userId, likeStatus) {
        await this.postLikeModel.updateOne({ postId, userId }, { $set: { postId, userId, likeStatus, addedAt: new Date() } }, { upsert: true }).exec();
    }
    async removeLike(postId, userId) {
        await this.postLikeModel.deleteOne({ postId, userId }).exec();
    }
};
exports.PostLikesRepository = PostLikesRepository;
exports.PostLikesRepository = PostLikesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(postLike_schema_1.PostLike.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostLikesRepository);
//# sourceMappingURL=post-likes.repository.js.map