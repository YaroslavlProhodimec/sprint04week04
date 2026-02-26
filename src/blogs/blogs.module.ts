// src/blogs/blogs.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsRepository } from './blogs.repository';
import { Blog, BlogSchema } from '../schemas/blog.schema';
import { BlogsController } from './blog.controller';
import { BlogsService } from './blog.service';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema }
    ]),
    forwardRef(() => PostsModule),
    AuthModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository],
  exports: [BlogsService, BlogsRepository], // Экспортируем для использования в PostsModule
})
export class BlogsModule {}
