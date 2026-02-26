import { IsString, IsNotEmpty, Length, IsOptional, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'isTrimmedNotEmpty', async: false })
export class IsTrimmedNotEmpty implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (typeof value !== 'string') return false;
    return value.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `Incorrect ${args.property}`;
  }
}

export class CreatePostDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Validate(IsTrimmedNotEmpty)
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Validate(IsTrimmedNotEmpty)
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Validate(IsTrimmedNotEmpty)
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Incorrect blogId' })
  blogId: string;
}

export class UpdatePostDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Validate(IsTrimmedNotEmpty)
  @Length(1, 30, { message: 'Incorrect title' })
  title: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Validate(IsTrimmedNotEmpty)
  @Length(1, 100, { message: 'Incorrect shortDescription' })
  shortDescription: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Validate(IsTrimmedNotEmpty)
  @Length(1, 1000, { message: 'Incorrect content' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Incorrect blogId' })
  blogId: string;
}
