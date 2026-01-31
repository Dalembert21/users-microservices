import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'users-microservice-consumer',
        allowAutoTopicCreation: true,
        subscribe: {
          fromBeginning: false,
        },
      },
      producer: {
        brokers: ['localhost:9092'],
        allowAutoTopicCreation: true,
      },
      run: {
        autoCommit: true,
        autoCommitInterval: 5000,
      },
    } as any,
  });

  await app.startAllMicroservices();
}
bootstrap();
