import { IsString, Length, Matches, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

export class CreateBlogDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect name' })
  @Length(1, 15, { message: 'Incorrect name' })
  name: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect description' })
  @Length(1, 500, { message: 'Incorrect description' })
  description: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect websiteUrl' })
  @Length(1, 100, { message: 'Incorrect websiteUrl' })
  @Matches(websiteUrlRegex, { message: 'Incorrect websiteUrl' })
  websiteUrl: string;
}

export class UpdateBlogDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect name' })
  @Length(1, 15, { message: 'Incorrect name' })
  name: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect description' })
  @Length(1, 500, { message: 'Incorrect description' })
  description: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'Incorrect websiteUrl' })
  @Length(1, 100, { message: 'Incorrect websiteUrl' })
  @Matches(websiteUrlRegex, { message: 'Incorrect websiteUrl' })
  websiteUrl: string;
}
