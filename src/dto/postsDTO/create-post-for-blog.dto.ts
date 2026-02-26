import { IsString, Length } from 'class-validator';

export class CreatePostForBlogDto {
  @IsString()
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @IsString()
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @IsString()
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;
}
