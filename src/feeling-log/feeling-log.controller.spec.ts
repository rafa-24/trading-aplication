import { Test, TestingModule } from '@nestjs/testing';
import { FeelingLogController } from './feeling-log.controller';
import { FeelingLogService } from './feeling-log.service';

describe('FeelingLogController', () => {
  let controller: FeelingLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeelingLogController],
      providers: [FeelingLogService],
    }).compile();

    controller = module.get<FeelingLogController>(FeelingLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
