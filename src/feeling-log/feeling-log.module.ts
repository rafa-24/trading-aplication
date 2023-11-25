import { Module } from '@nestjs/common';
import { FeelingLogService } from './service/feeling-log.service';
import { FeelingLogController } from './controller/feeling-log.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [FeelingLogController],
  providers: [FeelingLogService],
})
export class FeelingLogModule {}
