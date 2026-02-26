import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsTrimmedNotEmpty implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class CreatePostDto {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}
export declare class UpdatePostDto {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}
