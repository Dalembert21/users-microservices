import { User } from '../../entities/user.entity/user.entity';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(page: number, limit: number): Promise<User[]>;
  abstract count(): Promise<number>;
}
