import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../commands/create-user.command/create-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository/user.repository';
import { User } from '../../../domain/entities/user.entity/user.entity';
import { Email } from '../../../domain/value-objects/email.value-object';
import { FullName } from '../../../domain/value-objects/full-name.value-object';
import { EventPublisher } from '../../../infrastructure/events/event-publisher.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand) {
    const email = new Email(command.email);
    const fullName = new FullName(command.fullName);
    
    const user = User.create(email, fullName);
    
    await this.userRepo.save(user);
    
    const domainEvents = user.getDomainEvents();
    if (domainEvents.length > 0) {
      await this.eventPublisher.publishBatch(domainEvents);
      user.clearDomainEvents();
    }
    
    return {
      id: user.id.getValue(),
      email: user.email.getValue(),
      fullName: user.fullName.getValue(),
      createdAt: user.created_at,
    };
  }
}
