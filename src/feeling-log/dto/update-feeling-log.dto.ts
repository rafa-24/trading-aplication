import { PartialType } from '@nestjs/swagger';
import { CreateFeelingLogDto } from './create-feeling-log.dto';

export class UpdateFeelingLogDto extends PartialType(CreateFeelingLogDto) {}
