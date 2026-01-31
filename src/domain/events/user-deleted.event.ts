import { DomainEvent } from './domain-event.base';

export class UserDeletedEvent extends DomainEvent {
  constructor(aggregateId: string) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'UserDeleted';
  }
}
