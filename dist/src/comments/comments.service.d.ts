import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../posts/posts.repository';
import { UsersRepository } from '../users/users.repository';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly postsRepository;
    private readonly usersRepository;
    constructor(commentsRepository: CommentsRepository, postsRepository: PostsRepository, usersRepository: UsersRepository);
    createComment(postId: string, content: string, userId: string): Promise<any>;
    getCommentById(id: string, userId?: string): Promise<any>;
    getCommentsByPostId(postId: string, query: any, userId?: string): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: any[];
    }>;
    updateComment(commentId: string, content: string, userId: string): Promise<void>;
    deleteComment(commentId: string, userId: string): Promise<void>;
    setCommentLikeStatus(commentId: string, userId: string, likeStatus: 'Like' | 'Dislike' | 'None'): Promise<void>;
}
