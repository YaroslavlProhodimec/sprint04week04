import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(20, 300, { message: 'Incorrect content' })
  content: string;
}

export class UpdateCommentDto {
  @IsString()
  @Length(20, 300, { message: 'Incorrect content' })
  content: string;
}
