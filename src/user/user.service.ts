import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: { profile: true },
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.save(userData);
    return newUser;
  }

  async update(id: number, userData: UpdateUserDto) {
    const user = await this.getUserById(id);
    const updatedUser = this.userRepository.merge(user, userData);
    const saveUserUpdate = await this.userRepository.save(updatedUser);
    return saveUserUpdate;
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
