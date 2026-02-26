import { IsString, Length, Matches } from 'class-validator';

const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

export class CreateBlogDto {
  @IsString()
  @Length(1, 15, { message: 'Incorrect name' })
  name: string;

  @IsString()
  @Length(1, 500, { message: 'Incorrect description' })
  description: string;

  @IsString()
  @Length(1, 100, { message: 'Incorrect websiteUrl' })
  @Matches(websiteUrlRegex, { message: 'Incorrect websiteUrl' })
  websiteUrl: string;
}

export class UpdateBlogDto {
  @IsString()
  @Length(1, 15, { message: 'Incorrect name' })
  name: string;

  @IsString()
  @Length(1, 500, { message: 'Incorrect description' })
  description: string;

  @IsString()
  @Length(1, 100, { message: 'Incorrect websiteUrl' })
  @Matches(websiteUrlRegex, { message: 'Incorrect websiteUrl' })
  websiteUrl: string;
}
