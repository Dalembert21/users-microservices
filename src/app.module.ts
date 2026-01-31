import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppService } from './app.service';
import { UserMicroserviceController } from './infrastructure/kafka/user-microservice.controller';
import { CreateUserHandler } from './application/handlers/create-user.handler/create-user.handler';
import { GetUserHandler } from './application/handlers/query-handlers/get-user.handler/get-user.handler';
import { GetUsersHandler } from './application/handlers/query-handlers/get-users.handler/get-users.handler';
import { UserRepository } from './domain/repositories/user.repository/user.repository';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';
import { UserOrmEntity } from './infrastructure/persistence/user.orm.entity/user.orm.entity';
import { EventPublisher } from './infrastructure/events/event-publisher.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5433,
      username: 'admin',      
      password: 'admin123',  
      database: 'users_db',  
      entities: [UserOrmEntity],
      synchronize: true,     
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  controllers: [UserMicroserviceController],
  providers: [
    AppService,
    CreateUserHandler,
    GetUserHandler,
    GetUsersHandler,
    EventPublisher,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AppModule {}