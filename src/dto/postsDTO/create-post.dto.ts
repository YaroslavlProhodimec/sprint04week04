import { IsString, IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect title' })
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect shortDescription' })
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect content' })
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Incorrect blogId' })
  blogId: string;
}

export class UpdatePostDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect title' })
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect shortDescription' })
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect content' })
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Incorrect blogId' })
  blogId: string;
}
