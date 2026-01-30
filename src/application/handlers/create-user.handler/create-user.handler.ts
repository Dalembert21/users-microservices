import { CreateUserCommand } from '../../commands/create-user.command/create-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository/user.repository';
import { User } from '../../../domain/entities/user.entity/user.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateUserHandler {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const user = new User(randomUUID(), command.email, command.fullName);
    await this.userRepo.save(user);
  }
}
