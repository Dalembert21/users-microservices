import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConsumer } from './kafka.consumer';

describe('KafkaConsumer', () => {
  let provider: KafkaConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaConsumer],
    }).compile();

    provider = module.get<KafkaConsumer>(KafkaConsumer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
