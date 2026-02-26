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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { UserId } from '../auth/decorators/user-id.decorator';
import { CreateCommentDto, UpdateCommentDto } from '../dto/commentsDTO/create-comment.dto';
import { LikeStatusDto } from '../dto/postsDTO/like-status.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // POST /posts/:postId/comments - создать комментарий
  @Post('posts/:postId/comments')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @UserId() userId: string,
  ) {
    return this.commentsService.createComment(postId, dto.content, userId);
  }

  // GET /posts/:postId/comments - получить комментарии поста
  @Get('posts/:postId/comments')
  @UseGuards(OptionalJwtGuard)
  async getCommentsByPostId(
    @Param('postId') postId: string,
    @Query() query: any,
    @Req() req: { user?: { userId: string } },
  ) {
    const userId = req.user?.userId;
    return this.commentsService.getCommentsByPostId(postId, query, userId);
  }

  // GET /comments/:id - получить комментарий по ID
  @Get('comments/:id')
  @UseGuards(OptionalJwtGuard)
  async getCommentById(
    @Param('id') id: string,
    @Req() req: { user?: { userId: string } },
  ) {
    const userId = req.user?.userId;
    const comment = await this.commentsService.getCommentById(id, userId);
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  // PUT /comments/:commentId - обновить комментарий
  @Put('comments/:commentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
    @UserId() userId: string,
  ) {
    await this.commentsService.updateComment(commentId, dto.content, userId);
  }

  // DELETE /comments/:commentId - удалить комментарий
  @Delete('comments/:commentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('commentId') commentId: string,
    @UserId() userId: string,
  ) {
    await this.commentsService.deleteComment(commentId, userId);
  }

  // PUT /comments/:commentId/like-status - установить лайк/дизлайк
  @Put('comments/:commentId/like-status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async setCommentLikeStatus(
    @Param('commentId') commentId: string,
    @Body() dto: LikeStatusDto,
    @UserId() userId: string,
  ) {
    await this.commentsService.setCommentLikeStatus(commentId, userId, dto.likeStatus);
  }
}
