import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserReadEntity } from './user-read.entity';

export interface UserReadDto {
  id: string;
  email: string;
  fullName: string;
  postsCount: number;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserReadRepository {
  constructor(
    @InjectRepository(UserReadEntity)
    private readonly repo: Repository<UserReadEntity>,
  ) {}

  async findById(id: string): Promise<UserReadDto | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;

    return {
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      postsCount: entity.postsCount,
      lastLogin: entity.lastLogin,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findAll(page: number, limit: number): Promise<UserReadDto[]> {
    const skip = (page - 1) * limit;
    const entities = await this.repo.find({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return entities.map(entity => ({
      id: entity.id,
      email: entity.email,
      fullName: entity.fullName,
      postsCount: entity.postsCount,
      lastLogin: entity.lastLogin,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }

  async count(): Promise<number> {
    return await this.repo.count();
  }

  async create(userData: Partial<UserReadDto>): Promise<UserReadDto> {
    const entity = this.repo.create(userData);
    const saved = await this.repo.save(entity);
    
    return {
      id: saved.id,
      email: saved.email,
      fullName: saved.fullName,
      postsCount: saved.postsCount,
      lastLogin: saved.lastLogin,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  async update(id: string, data: Partial<UserReadDto>): Promise<void> {
    await this.repo.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }
}
