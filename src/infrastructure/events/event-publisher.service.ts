import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../../domain/events/domain-event.base';

@Injectable()
export class EventPublisher {
  async publish(event: DomainEvent): Promise<void> {
    const eventName = event.getEventName();
    const eventData = {
      eventId: crypto.randomUUID(),
      eventName,
      aggregateId: event.aggregateId,
      occurredOn: event.occurredOn,
      data: event,
    };
  }

  async publishBatch(events: DomainEvent[]): Promise<void> {
    const publishPromises = events.map(event => this.publish(event));
    await Promise.all(publishPromises);
  }
}
