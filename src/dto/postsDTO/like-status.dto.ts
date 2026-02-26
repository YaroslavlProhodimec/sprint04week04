import { IsIn } from 'class-validator';

export class LikeStatusDto {
  @IsIn(['Like', 'Dislike', 'None'], {
    message: "likeStatus must be 'Like', 'Dislike' or 'None'",
  })
  likeStatus: 'Like' | 'Dislike' | 'None';
}
