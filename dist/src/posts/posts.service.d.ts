import { PostsRepository } from './posts.repository';
import { PostLikesRepository } from '../post-likes/post-likes.repository';
import { CreatePostDto, UpdatePostDto } from '../types/post/input';
import { OutputPostType } from '../types/post/output';
export declare class PostsService {
    private readonly postsRepository;
    private readonly postLikesRepository;
    constructor(postsRepository: PostsRepository, postLikesRepository: PostLikesRepository);
    getAllPosts(query: any, userId?: string): Promise<{
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
    getPostById(id: string, userId?: string): Promise<OutputPostType | null>;
    createPost(createPostDto: CreatePostDto): Promise<OutputPostType>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<boolean>;
    deletePost(id: string): Promise<boolean>;
    getBlogPosts(blogId: string, query: any, userId?: string): Promise<{
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
    createPostForBlog(blogId: string, postData: CreatePostDto): Promise<OutputPostType>;
    setPostLikeStatus(postId: string, userId: string, likeStatus: 'Like' | 'Dislike' | 'None'): Promise<void>;
}
