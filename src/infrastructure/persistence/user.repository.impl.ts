import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository/user.repository';
import { User } from '../../domain/entities/user.entity/user.entity';
import { UserOrmEntity } from './user.orm.entity/user.orm.entity';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repo: Repository<UserOrmEntity>,
    ) {
        super();
    }

    async save(user: User): Promise<void> {
        const ormEntity = this.repo.create({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
        });
        await this.repo.save(ormEntity);
    }

    async findByEmail(email: string): Promise<User | null> {
        const ormEntity = await this.repo.findOne({ where: { email } });
        if (!ormEntity) return null;
        return new User(ormEntity.id, ormEntity.email, ormEntity.fullName);
    }
}
