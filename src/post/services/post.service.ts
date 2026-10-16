import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find({
        relations: {
          user: {
            profile: true,
          },
          categories: true,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Could not retrieve posts');
    }
  }

  async findOne(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: {
          user: {
            profile: true,
          },
        },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      return post;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Could not retrieve post');
    }
  }

  async create(body: CreatePostDto): Promise<Post> {
    try {
      const { userId, ...postData } = body;

      return await this.postRepository.save({
        ...postData,
        user: userId ? { id: userId } : undefined,
        categories: body.categoryIds
          ? body.categoryIds.map((categoryId) => ({ id: categoryId }))
          : undefined,
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error('Error creating post:', error);
      throw new InternalServerErrorException('Could not create post');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.findOne(id);
      const { userId, ...rest } = updatePostDto as CreatePostDto & {
        userId?: number;
      };
      const updatedPost = this.postRepository.merge(post, {
        ...rest,
        ...(userId ? { user: { id: userId } } : {}),
      });

      return await this.postRepository.save(updatedPost);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Could not update post');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const post = await this.findOne(id);

      await this.postRepository.remove(post);
      return { message: `Post with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Could not delete post');
    }
  }

  async findByCategory(categoryId: number): Promise<Post[]> {
    try {
      return await this.postRepository.find({
        where: {
          categories: {
            id: categoryId,
          },
        },
        relations: {
          user: {
            profile: true,
          },
          categories: true,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(
        'Could not retrieve posts by category',
      );
    }
  }
}
