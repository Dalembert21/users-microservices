import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../../../queries/get-users.query/get-users.query';
import { UserRepository } from '../../../../domain/repositories/user.repository/user.repository';
import { Injectable } from '@nestjs/common';

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

export interface GetUsersResponse {
  users: UserDto[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery, GetUsersResponse> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResponse> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    
    const users = await this.userRepository.findAll(page, limit);
    const total = await this.userRepository.count();

    const userDtos: UserDto[] = users.map(user => ({
      id: user.id.getValue(),
      email: user.email.getValue(),
      fullName: user.fullName.getValue(),
      createdAt: user.created_at,
    }));

    return {
      users: userDtos,
      total,
      page,
      limit,
    };
  }
}
