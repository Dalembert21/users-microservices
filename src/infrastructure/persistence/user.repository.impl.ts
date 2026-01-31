import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository/user.repository';
import { User } from '../../domain/entities/user.entity/user.entity';
import { UserOrmEntity } from './user.orm.entity/user.orm.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { Email } from '../../domain/value-objects/email.value-object';
import { FullName } from '../../domain/value-objects/full-name.value-object';

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
            id: user.id.getValue(),
            email: user.email.getValue(),
            fullName: user.fullName.getValue(),
            created_at: user.created_at,
        });
        await this.repo.save(ormEntity);
    }

    async findByEmail(email: string): Promise<User | null> {
        const ormEntity = await this.repo.findOne({ where: { email } });
        if (!ormEntity) return null;
        
        return new User(
            new UserId(ormEntity.id),
            new Email(ormEntity.email),
            new FullName(ormEntity.fullName),
            ormEntity.created_at,
        );
    }

    async findById(id: string): Promise<User | null> {
        const ormEntity = await this.repo.findOne({ where: { id } });
        if (!ormEntity) return null;
        
        return new User(
            new UserId(ormEntity.id),
            new Email(ormEntity.email),
            new FullName(ormEntity.fullName),
            ormEntity.created_at,
        );
    }

    async findAll(page: number, limit: number): Promise<User[]> {
        const skip = (page - 1) * limit;
        const ormEntities = await this.repo.find({
            skip,
            take: limit,
            order: { created_at: 'DESC' },
        });

        return ormEntities.map(ormEntity => 
            new User(
                new UserId(ormEntity.id),
                new Email(ormEntity.email),
                new FullName(ormEntity.fullName),
                ormEntity.created_at,
            )
        );
    }

    async count(): Promise<number> {
        return await this.repo.count();
    }
}
