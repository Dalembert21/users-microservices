import { Injectable } from '@nestjs/common';
import { CreateUserHandler } from '../../../application/handlers/create-user.handler/create-user.handler';
import { CreateUserCommand } from '../../../application/commands/create-user.command/create-user.command';

@Injectable()
export class KafkaConsumer {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  async consume(event: any) {
    const command = new CreateUserCommand(event.email, event.fullName);
    await this.createUserHandler.execute(command);
  }
}
