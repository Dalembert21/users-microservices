import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaConsumer } from './infrastructure/kafka/kafka.consumer/kafka.consumer';
import { CreateUserHandler } from './application/handlers/create-user.handler/create-user.handler';
import { UserRepository } from './domain/repositories/user.repository/user.repository';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';
import { UserOrmEntity } from './infrastructure/persistence/user.orm.entity/user.orm.entity';

@Module({
  imports: [
    // Conexion hacia docker 
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
  controllers: [AppController],
  providers: [
    AppService,
    KafkaConsumer,
    CreateUserHandler,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AppModule {}