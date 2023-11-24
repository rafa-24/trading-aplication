import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeelingLogService } from './feeling-log.service';
import { CreateFeelingLogDto } from './dto/create-feeling-log.dto';
import { UpdateFeelingLogDto } from './dto/update-feeling-log.dto';

@Controller('feeling-log')
export class FeelingLogController {
  constructor(private readonly feelingLogService: FeelingLogService) {}

  @Post()
  async create(@Body() createFeelingLogDto: CreateFeelingLogDto) {
    return await this.feelingLogService.create();
  }

  @Get()
  findAll() {
    return this.feelingLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feelingLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeelingLogDto: UpdateFeelingLogDto) {
    return this.feelingLogService.update(+id, updateFeelingLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feelingLogService.remove(+id);
  }
}
