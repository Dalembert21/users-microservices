import { UserId } from '../../value-objects/user-id.value-object';
import { Email } from '../../value-objects/email.value-object';
import { FullName } from '../../value-objects/full-name.value-object';
import { DomainEvent } from '../../events/domain-event.base';
import { UserCreatedEvent } from '../../events/user-created.event';
import { UserUpdatedEvent } from '../../events/user-updated.event';

export class User {
  private domainEvents: DomainEvent[] = [];

  constructor(
    public id: UserId,
    public email: Email,
    public fullName: FullName,
    public created_at: Date = new Date(),
  ) {}

  static create(email: Email, fullName: FullName): User {
    const id = new UserId(crypto.randomUUID());
    const user = new User(id, email, fullName);
    
    user.addDomainEvent(new UserCreatedEvent(
      id.getValue(),
      email.getValue(),
      fullName.getValue()
    ));
    
    return user;
  }

  updateEmail(newEmail: Email): void {
    this.email = newEmail;
    this.addDomainEvent(new UserUpdatedEvent(
      this.id.getValue(),
      newEmail.getValue(),
      undefined
    ));
  }

  updateFullName(newFullName: FullName): void {
    this.fullName = newFullName;
    this.addDomainEvent(new UserUpdatedEvent(
      this.id.getValue(),
      undefined,
      newFullName.getValue()
    ));
  }

  private addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }

  clearDomainEvents(): void {
    this.domainEvents = [];
  }
}
