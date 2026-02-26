import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from '../dto/commentsDTO/create-comment.dto';
import { LikeStatusDto } from '../dto/postsDTO/like-status.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(postId: string, dto: CreateCommentDto, userId: string): Promise<any>;
    getCommentsByPostId(postId: string, query: any, req: {
        user?: {
            userId: string;
        };
    }): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: any[];
    }>;
    getCommentById(id: string, req: {
        user?: {
            userId: string;
        };
    }): Promise<any>;
    updateComment(commentId: string, dto: UpdateCommentDto, userId: string): Promise<void>;
    deleteComment(commentId: string, userId: string): Promise<void>;
    setCommentLikeStatus(commentId: string, dto: LikeStatusDto, userId: string): Promise<void>;
}
