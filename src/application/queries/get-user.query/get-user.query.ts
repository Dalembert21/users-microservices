import { UserId } from '../../../domain/value-objects/user-id.value-object';

export class GetUserQuery {
  constructor(public readonly userId: string) {}
}
