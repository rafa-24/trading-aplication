import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
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
  async create(
    @Body() createFeelingLogDto: CreateFeelingLogDto,
    @Req() req: Request,
  ) {
    return await this.feelingLogService.create(createFeelingLogDto, req.id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.feelingLogService.findAll(req.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const paramId = parseInt(id);
    return await this.feelingLogService.findOne(req.id, paramId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeelingLogDto: UpdateFeelingLogDto,
    @Req() req: Request
  ) {
    const paramId = parseInt(id);
    return await this.feelingLogService.update(req.id, paramId, updateFeelingLogDto);   
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Req() req: Request ) {
    const paramId = parseInt(id);
    return await this.feelingLogService.remove(req.id, paramId)
  }
}
