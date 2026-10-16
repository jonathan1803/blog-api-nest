import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { Post } from './entities/post.entity';
import { Category } from './category/category.entity';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostController, CategoryController],
  providers: [PostService, CategoryService],
  exports: [PostService, CategoryService],
})
export class PostModule {}
