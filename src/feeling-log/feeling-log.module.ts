import { Module } from '@nestjs/common';
import { FeelingLogService } from './service/feeling-log.service';
import { FeelingLogController } from './controller/feeling-log.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { FeelinLogSuscriber } from 'src/suscribers/feelingLog.suscriber';


@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [FeelingLogController],
  providers: [FeelingLogService, FeelinLogSuscriber],
})
export class FeelingLogModule {}
