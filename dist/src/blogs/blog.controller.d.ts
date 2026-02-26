import { SortDataType } from '../types/blog/input';
import { BlogType } from '../types/blog/output';
import { BlogsService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blogsDTO/create-blog.dto';
import { CreatePostForBlogDto } from '../dto/postsDTO/create-post-for-blog.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getBlogs(query: SortDataType): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: BlogType[];
    }>;
    getBlog(id: string): Promise<BlogType>;
    createBlog(createBlogDto: CreateBlogDto): Promise<BlogType>;
    updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<void>;
    deleteBlog(id: string): Promise<void>;
    getBlogPosts(id: string, query: any, req: {
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
    createPostForBlog(blogId: string, postData: CreatePostForBlogDto): Promise<import("../types/post/output").OutputPostType>;
}
