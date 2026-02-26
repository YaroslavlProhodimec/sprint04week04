import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentLikeDocument = CommentLike & Document;

@Schema({ collection: 'commentLikes', timestamps: false })
export class CommentLike {
  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['Like', 'Dislike'] })
  likeStatus: 'Like' | 'Dislike';

  @Prop({ default: () => new Date() })
  addedAt: Date;
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike);

CommentLikeSchema.index({ commentId: 1, userId: 1 }, { unique: true });
