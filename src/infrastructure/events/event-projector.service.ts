import { Injectable } from '@nestjs/common';
import { UserReadRepository } from '../persistence/read-model/user-read.repository';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { UserUpdatedEvent } from '../../domain/events/user-updated.event';

@Injectable()
export class EventProjector {
  constructor(private readonly readRepository: UserReadRepository) {}

  async handleUserCreated(event: UserCreatedEvent): Promise<void> {
    await this.readRepository.create({
      id: event.aggregateId,
      email: event.email,
      fullName: event.fullName,
      postsCount: 0,
      createdAt: event.occurredOn,
    });
  }

  async handleUserUpdated(event: UserUpdatedEvent): Promise<void> {
    const updateData: any = {};
    
    if (event.email) {
      updateData.email = event.email;
    }
    
    if (event.fullName) {
      updateData.fullName = event.fullName;
    }

    if (Object.keys(updateData).length > 0) {
      await this.readRepository.update(event.aggregateId, updateData);
    }
  }
}
