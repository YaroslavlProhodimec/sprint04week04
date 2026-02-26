// src/blogs/blogs.controller.ts
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
import { SortDataType } from '../types/blog/input';
import { BlogType } from '../types/blog/output';
import { BlogsService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blogsDTO/create-blog.dto';
import { CreatePostForBlogDto } from '../dto/postsDTO/create-post-for-blog.dto';
import { BasicAuthGuard } from '../auth/guards/basic-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // GET /blogs - получить все блоги с пагинацией и поиском
  @Get()
  async getBlogs(@Query() query: SortDataType) {
    try {
      const blogs = await this.blogsService.getAllBlogs(query);
      return blogs;
    } catch (error) {
      throw new BadRequestException('Failed to get blogs');
    }
  }

  // GET /blogs/:id - получить блог по ID
  @Get(':id')
  async getBlog(@Param('id') id: string): Promise<BlogType> {
    const blog = await this.blogsService.getBlogById(id);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  // POST /blogs - создать новый блог
  @Post()
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<BlogType> {
    return this.blogsService.createBlog(createBlogDto);
  }

  // PUT /blogs/:id - обновить блог
  @Put(':id')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<void> {
    const updated = await this.blogsService.updateBlog(id, updateBlogDto);

    if (!updated) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }

  // DELETE /blogs/:id - удалить блог
  @Delete(':id')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param('id') id: string): Promise<void> {
    const deleted = await this.blogsService.deleteBlog(id);

    if (!deleted) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }

  // GET /blogs/:id/posts — посты по id блога (как BlogRepository.getPostsByBlogId(id, sortData, userId))
  @Get(':id/posts')
  @UseGuards(OptionalJwtGuard)
  async getBlogPosts(
    @Param('id') id: string,
    @Query() query: any,
    @Req() req: { user?: { userId: string } },
  ) {
    const sortData = {
      sortBy: query.sortBy,
      sortDirection: query.sortDirection,
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
    };
    const userId = req.user?.userId;

    const posts = await this.blogsService.getPostsByBlogId(id, sortData, userId);

    if (!posts || posts.items.length < 1) {
      throw new NotFoundException('Posts not found');
    }

    return posts;
  }

  // POST /blogs/:id/posts - создать пост для блога
  @Post(':id/posts')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPostForBlog(@Param('id') blogId: string, @Body() postData: CreatePostForBlogDto) {
    const blog = await this.blogsService.getBlogById(blogId);

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }

    const newPost = await this.blogsService.createPostForBlog(blogId, postData);
    return newPost;
  }
}
