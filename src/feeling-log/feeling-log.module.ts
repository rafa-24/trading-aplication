import { Module } from '@nestjs/common';
import { FeelingLogService } from './feeling-log.service';
import { FeelingLogController } from './feeling-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionalLog } from 'src/entity/emotionalLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmotionalLog])],
  controllers: [FeelingLogController],
  providers: [FeelingLogService],
})
export class FeelingLogModule {}
