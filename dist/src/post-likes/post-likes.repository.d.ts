import { Model } from 'mongoose';
import { PostLikeDocument } from '../schemas/postLike.schema';
export declare class PostLikesRepository {
    private postLikeModel;
    constructor(postLikeModel: Model<PostLikeDocument>);
    countByPostAndStatus(postId: string, likeStatus: 'Like' | 'Dislike'): Promise<number>;
    findMyStatus(postId: string, userId: string): Promise<'Like' | 'Dislike' | null>;
    findNewestLikes(postId: string, limit?: number): Promise<Array<{
        userId: string;
        addedAt: Date;
    }>>;
    setLike(postId: string, userId: string, likeStatus: 'Like' | 'Dislike'): Promise<void>;
    removeLike(postId: string, userId: string): Promise<void>;
}
