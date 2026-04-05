// src/testing/testing.controller.ts
import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { Post, PostDocument } from '../schemas/post.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { PostLike, PostLikeDocument } from '../schemas/postLike.schema';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { CommentLike, CommentLikeDocument } from '../schemas/commentLike.schema';
import { DeviceSession, DeviceSessionDocument } from '../schemas/deviceSession.schema';

@Controller('testing')
export class TestingController {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>,
    @InjectModel(DeviceSession.name) private deviceSessionModel: Model<DeviceSessionDocument>,
  ) {}

  @Delete('all-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllData() {
    await Promise.all([
      this.blogModel.deleteMany({}),
      this.postModel.deleteMany({}),
      this.userModel.deleteMany({}),
      this.postLikeModel.deleteMany({}),
      this.commentModel.deleteMany({}),
      this.commentLikeModel.deleteMany({}),
      this.deviceSessionModel.deleteMany({}),
    ]);
  }
}
