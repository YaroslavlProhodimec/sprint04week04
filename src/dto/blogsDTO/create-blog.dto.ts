import { IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

export class CreateBlogDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 15, { message: 'Incorrect name' })
  name: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 500, { message: 'Incorrect description' })
  description: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 100, { message: 'Incorrect websiteUrl' })
  @Matches(websiteUrlRegex, { message: 'Incorrect websiteUrl' })
  websiteUrl: string;
}

export class UpdateBlogDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 15, { message: 'Incorrect name' })
  name: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 500, { message: 'Incorrect description' })
  description: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(1, 100, { message: 'Incorrect websiteUrl' })
  @Matches(websiteUrlRegex, { message: 'Incorrect websiteUrl' })
  websiteUrl: string;
}
