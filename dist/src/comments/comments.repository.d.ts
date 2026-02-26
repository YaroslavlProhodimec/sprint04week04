import { Model } from 'mongoose';
import { CommentDocument } from '../schemas/comment.schema';
import { CommentLikeDocument } from '../schemas/commentLike.schema';
export declare class CommentsRepository {
    private commentModel;
    private commentLikeModel;
    constructor(commentModel: Model<CommentDocument>, commentLikeModel: Model<CommentLikeDocument>);
    createComment(postId: string, content: string, userId: string, userLogin: string): Promise<any>;
    getCommentById(id: string, userId?: string): Promise<any>;
    getCommentsByPostId(postId: string, query?: any, userId?: string): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: any[];
    }>;
    updateComment(id: string, content: string): Promise<boolean>;
    deleteComment(id: string): Promise<boolean>;
    countByCommentAndStatus(commentId: string, likeStatus: 'Like' | 'Dislike'): Promise<number>;
    findMyStatus(commentId: string, userId: string): Promise<'Like' | 'Dislike' | null>;
    setLike(commentId: string, userId: string, likeStatus: 'Like' | 'Dislike'): Promise<void>;
    removeLike(commentId: string, userId: string): Promise<void>;
    findCommentByIdRaw(id: string): Promise<CommentDocument | null>;
}
