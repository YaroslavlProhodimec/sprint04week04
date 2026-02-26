"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = exports.CreatePostDto = exports.IsTrimmedNotEmpty = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let IsTrimmedNotEmpty = class IsTrimmedNotEmpty {
    validate(value) {
        if (typeof value !== 'string')
            return false;
        return value.trim().length > 0;
    }
    defaultMessage(args) {
        return `Incorrect ${args.property}`;
    }
};
exports.IsTrimmedNotEmpty = IsTrimmedNotEmpty;
exports.IsTrimmedNotEmpty = IsTrimmedNotEmpty = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isTrimmedNotEmpty', async: false })
], IsTrimmedNotEmpty);
class CreatePostDto {
    title;
    shortDescription;
    content;
    blogId;
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Validate)(IsTrimmedNotEmpty),
    (0, class_validator_1.Length)(1, 30, { message: 'Incorrect title' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Validate)(IsTrimmedNotEmpty),
    (0, class_validator_1.Length)(1, 100, { message: 'Incorrect shortDescription' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Validate)(IsTrimmedNotEmpty),
    (0, class_validator_1.Length)(1, 1000, { message: 'Incorrect content' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Incorrect blogId' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "blogId", void 0);
class UpdatePostDto {
    title;
    shortDescription;
    content;
    blogId;
}
exports.UpdatePostDto = UpdatePostDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Validate)(IsTrimmedNotEmpty),
    (0, class_validator_1.Length)(1, 30, { message: 'Incorrect title' }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Validate)(IsTrimmedNotEmpty),
    (0, class_validator_1.Length)(1, 100, { message: 'Incorrect shortDescription' }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Validate)(IsTrimmedNotEmpty),
    (0, class_validator_1.Length)(1, 1000, { message: 'Incorrect content' }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Incorrect blogId' }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "blogId", void 0);
//# sourceMappingURL=create-post.dto.js.map