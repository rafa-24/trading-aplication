import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FeelingLogService } from '../service/feeling-log.service';
import { CreateFeelingLogDto } from '../dto/create-feeling-log.dto';
import { UpdateFeelingLogDto } from '../dto/update-feeling-log.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

@Controller('feeling-log')
@UseGuards(AuthGuard)
export class FeelingLogController {
  constructor(private readonly feelingLogService: FeelingLogService) {}
  
  
  @Post()
  async create(@Body() createFeelingLogDto: CreateFeelingLogDto, @Req() req: Request) {
    return await this.feelingLogService.create(createFeelingLogDto, req.id);
  }
  
  @Get()
  async findAll(@Req() req: Request) {
    return await this.feelingLogService.findAll(req.id);
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
