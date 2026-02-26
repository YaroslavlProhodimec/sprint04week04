import { Document } from 'mongoose';
export type CommentLikeDocument = CommentLike & Document;
export declare class CommentLike {
    commentId: string;
    userId: string;
    likeStatus: 'Like' | 'Dislike';
    addedAt: Date;
}
export declare const CommentLikeSchema: import("mongoose").Schema<CommentLike, import("mongoose").Model<CommentLike, any, any, any, Document<unknown, any, CommentLike, any> & CommentLike & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CommentLike, Document<unknown, {}, import("mongoose").FlatRecord<CommentLike>, {}> & import("mongoose").FlatRecord<CommentLike> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
