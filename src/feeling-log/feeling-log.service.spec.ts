import { Test, TestingModule } from '@nestjs/testing';
import { FeelingLogService } from './feeling-log.service';

describe('FeelingLogService', () => {
  let service: FeelingLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeelingLogService],
    }).compile();

    service = module.get<FeelingLogService>(FeelingLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
