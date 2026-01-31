import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaConsumer } from './infrastructure/kafka/kafka.consumer/kafka.consumer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kafkaConsumer: KafkaConsumer,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any) {
    await this.kafkaConsumer.consume(data);
  }
}
