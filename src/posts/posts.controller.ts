// src/posts/posts.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OutputPostType } from '../types/post/output';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BasicAuthGuard } from '../auth/guards/basic-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { UserId } from '../auth/decorators/user-id.decorator';
import { LikeStatusDto } from '../dto/postsDTO/like-status.dto';
import { CreatePostDto, UpdatePostDto } from '../dto/postsDTO/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts - получить все посты с пагинацией
  @Get()
  @UseGuards(OptionalJwtGuard)
  async getPosts(@Query() query: any, @Req() req: { user?: { userId: string } }) {
    try {
      const userId = req.user?.userId;
      const posts = await this.postsService.getAllPosts(query, userId);
      return posts;
    } catch (error) {
      throw new BadRequestException('Failed to get posts');
    }
  }

  // GET /posts/:id - получить пост по ID
  @Get(':id')
  @UseGuards(OptionalJwtGuard)
  async getPost(
    @Param('id') id: string,
    @Req() req: { user?: { userId: string } },
  ): Promise<OutputPostType> {
    const userId = req.user?.userId;
    const post = await this.postsService.getPostById(id, userId);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  // PUT /posts/:postId/like-status - установить лайк/дизлайк
  @Put(':postId/like-status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async setPostLikeStatus(
    @Param('postId') postId: string,
    @Body() dto: LikeStatusDto,
    @UserId() userId: string,
  ): Promise<void> {
    await this.postsService.setPostLikeStatus(postId, userId, dto.likeStatus);
  }

  // POST /posts - создать новый пост
  @Post()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createPostDto: CreatePostDto): Promise<OutputPostType> {
    const newPost = await this.postsService.createPost(createPostDto);
    return newPost;
  }

  // PUT /posts/:id - обновить пост
  @Put(':id')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    const updated = await this.postsService.updatePost(id, updatePostDto);
    if (!updated) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  // DELETE /posts/:id - удалить пост
  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string): Promise<void> {
    const deleted = await this.postsService.deletePost(id);
    if (!deleted) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
