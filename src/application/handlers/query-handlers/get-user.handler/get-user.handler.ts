import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../../../queries/get-user.query/get-user.query';
import { UserRepository } from '../../../../domain/repositories/user.repository/user.repository';
import { Injectable } from '@nestjs/common';

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, UserDto | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<UserDto | null> {
    const user = await this.userRepository.findById(query.userId);
    
    if (!user) {
      return null;
    }

    return {
      id: user.id.getValue(),
      email: user.email.getValue(),
      fullName: user.fullName.getValue(),
      createdAt: user.created_at,
    };
  }
}
