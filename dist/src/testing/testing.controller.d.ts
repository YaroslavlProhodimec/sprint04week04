import { Model } from 'mongoose';
import { BlogDocument } from '../schemas/blog.schema';
import { PostDocument } from '../schemas/post.schema';
import { UserDocument } from '../schemas/user.schema';
import { PostLikeDocument } from '../schemas/postLike.schema';
import { CommentDocument } from '../schemas/comment.schema';
import { CommentLikeDocument } from '../schemas/commentLike.schema';
export declare class TestingController {
    private blogModel;
    private postModel;
    private userModel;
    private postLikeModel;
    private commentModel;
    private commentLikeModel;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>, userModel: Model<UserDocument>, postLikeModel: Model<PostLikeDocument>, commentModel: Model<CommentDocument>, commentLikeModel: Model<CommentLikeDocument>);
    deleteAllData(): Promise<void>;
}
