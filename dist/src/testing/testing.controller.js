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
exports.TestingController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("../schemas/blog.schema");
const post_schema_1 = require("../schemas/post.schema");
const user_schema_1 = require("../schemas/user.schema");
const postLike_schema_1 = require("../schemas/postLike.schema");
const comment_schema_1 = require("../schemas/comment.schema");
const commentLike_schema_1 = require("../schemas/commentLike.schema");
let TestingController = class TestingController {
    blogModel;
    postModel;
    userModel;
    postLikeModel;
    commentModel;
    commentLikeModel;
    constructor(blogModel, postModel, userModel, postLikeModel, commentModel, commentLikeModel) {
        this.blogModel = blogModel;
        this.postModel = postModel;
        this.userModel = userModel;
        this.postLikeModel = postLikeModel;
        this.commentModel = commentModel;
        this.commentLikeModel = commentLikeModel;
    }
    async deleteAllData() {
        await Promise.all([
            this.blogModel.deleteMany({}),
            this.postModel.deleteMany({}),
            this.userModel.deleteMany({}),
            this.postLikeModel.deleteMany({}),
            this.commentModel.deleteMany({}),
            this.commentLikeModel.deleteMany({}),
        ]);
    }
};
exports.TestingController = TestingController;
__decorate([
    (0, common_1.Delete)('all-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "deleteAllData", null);
exports.TestingController = TestingController = __decorate([
    (0, common_1.Controller)('testing'),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(postLike_schema_1.PostLike.name)),
    __param(4, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(5, (0, mongoose_1.InjectModel)(commentLike_schema_1.CommentLike.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TestingController);
//# sourceMappingURL=testing.controller.js.map