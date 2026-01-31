import { DomainEvent } from './domain-event.base';

export class UserUpdatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly email?: string,
    public readonly fullName?: string,
  ) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'UserUpdated';
  }
}
