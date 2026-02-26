import { CreatePostDto, UpdatePostDto } from '../types/post/input';
import { OutputPostType } from '../types/post/output';
import { PostsService } from './posts.service';
import { LikeStatusDto } from '../dto/postsDTO/like-status.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(query: any, req: {
        user?: {
            userId: string;
        };
    }): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: any;
            title: any;
            shortDescription: any;
            content: any;
            blogId: any;
            blogName: any;
            createdAt: string;
            extendedLikesInfo: {
                likesCount: number;
                dislikesCount: number;
                myStatus: "Like" | "Dislike" | "None";
                newestLikes: {
                    addedAt: string;
                    userId: string;
                    login: string;
                }[];
            };
        }[];
    }>;
    getPost(id: string, req: {
        user?: {
            userId: string;
        };
    }): Promise<OutputPostType>;
    setPostLikeStatus(postId: string, dto: LikeStatusDto, userId: string): Promise<void>;
    createPost(createPostDto: CreatePostDto): Promise<OutputPostType>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<void>;
    deletePost(id: string): Promise<void>;
}
