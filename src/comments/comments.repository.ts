import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { CommentLike, CommentLikeDocument } from '../schemas/commentLike.schema';
import { v4 as uuidv4 } from 'uuid';
import { commentsMapper } from '../types/comments/mapper';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>,
  ) {}

  async createComment(postId: string, content: string, userId: string, userLogin: string) {
    const commentData = {
      id: uuidv4(),
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

    return commentsMapper(newComment, 'None', 0, 0);
  }

  async getCommentById(id: string, userId?: string) {
    const comment = await this.commentModel.findOne({ id }).exec();
    if (!comment) return null;

    const [likesCount, dislikesCount] = await Promise.all([
      this.countByCommentAndStatus(id, 'Like'),
      this.countByCommentAndStatus(id, 'Dislike'),
    ]);

    let myStatus: 'Like' | 'Dislike' | 'None' = 'None';
    if (userId) {
      const status = await this.findMyStatus(id, userId);
      if (status) myStatus = status;
    }

    return commentsMapper(comment, myStatus, likesCount, dislikesCount);
  }

  async getCommentsByPostId(postId: string, query: any = {}, userId?: string) {
    const {
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = 1,
      pageSize = 10,
    } = query;

    const comments = await this.commentModel
      .find({ postId })
      .sort({ [sortBy]: sortDirection === 'desc' ? -1 : 1 })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .exec();

    const totalCount = await this.commentModel.countDocuments({ postId });
    const pagesCount = Math.ceil(totalCount / +pageSize);

    const items = await Promise.all(
      comments.map(async (comment) => {
        const commentId = comment.id;
        const [likesCount, dislikesCount] = await Promise.all([
          this.countByCommentAndStatus(commentId, 'Like'),
          this.countByCommentAndStatus(commentId, 'Dislike'),
        ]);

        let myStatus: 'Like' | 'Dislike' | 'None' = 'None';
        if (userId) {
          const status = await this.findMyStatus(commentId, userId);
          if (status) myStatus = status;
        }

        return commentsMapper(comment, myStatus, likesCount, dislikesCount);
      }),
    );

    return {
      pagesCount,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount,
      items,
    };
  }

  async updateComment(id: string, content: string): Promise<boolean> {
    const result = await this.commentModel.updateOne({ id }, { content }).exec();
    return result.matchedCount === 1;
  }

  async deleteComment(id: string): Promise<boolean> {
    const result = await this.commentModel.deleteOne({ id }).exec();
    return result.deletedCount === 1;
  }

  async countByCommentAndStatus(commentId: string, likeStatus: 'Like' | 'Dislike'): Promise<number> {
    return this.commentLikeModel.countDocuments({ commentId, likeStatus }).exec();
  }

  async findMyStatus(commentId: string, userId: string): Promise<'Like' | 'Dislike' | null> {
    const like = await this.commentLikeModel.findOne({ commentId, userId }).exec();
    return like?.likeStatus ?? null;
  }

  async setLike(commentId: string, userId: string, likeStatus: 'Like' | 'Dislike'): Promise<void> {
    await this.commentLikeModel.updateOne(
      { commentId, userId },
      { $set: { commentId, userId, likeStatus, addedAt: new Date() } },
      { upsert: true },
    ).exec();
  }

  async removeLike(commentId: string, userId: string): Promise<void> {
    await this.commentLikeModel.deleteOne({ commentId, userId }).exec();
  }

  async findCommentByIdRaw(id: string): Promise<CommentDocument | null> {
    return this.commentModel.findOne({ id }).exec();
  }
}
