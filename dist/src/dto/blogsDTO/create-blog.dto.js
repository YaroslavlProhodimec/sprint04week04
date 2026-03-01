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
exports.UpdateBlogDto = exports.CreateBlogDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
class CreateBlogDto {
    name;
    description;
    websiteUrl;
}
exports.CreateBlogDto = CreateBlogDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Length)(1, 15, { message: 'Incorrect name' }),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Length)(1, 500, { message: 'Incorrect description' }),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Length)(1, 100, { message: 'Incorrect websiteUrl' }),
    (0, class_validator_1.Matches)(websiteUrlRegex, { message: 'Incorrect websiteUrl' }),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "websiteUrl", void 0);
class UpdateBlogDto {
    name;
    description;
    websiteUrl;
}
exports.UpdateBlogDto = UpdateBlogDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Length)(1, 15, { message: 'Incorrect name' }),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Length)(1, 500, { message: 'Incorrect description' }),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.trim() : value)),
    (0, class_validator_1.Length)(1, 100, { message: 'Incorrect websiteUrl' }),
    (0, class_validator_1.Matches)(websiteUrlRegex, { message: 'Incorrect websiteUrl' }),
    __metadata("design:type", String)
], UpdateBlogDto.prototype, "websiteUrl", void 0);
//# sourceMappingURL=create-blog.dto.js.map