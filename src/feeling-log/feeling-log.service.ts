import { Injectable } from '@nestjs/common';
import { CreateFeelingLogDto } from './dto/create-feeling-log.dto';
import { UpdateFeelingLogDto } from './dto/update-feeling-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmotionalLog } from 'src/entity/emotionalLog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeelingLogService {
  constructor(
    @InjectRepository(EmotionalLog)
    private feelingLogRepository: Repository<EmotionalLog>
  ) {}


  async create() {
    const bitacoraRafa = new EmotionalLog();
    bitacoraRafa.fecha = new Date();
    bitacoraRafa.estado_emocional = 'Feliz';
    bitacoraRafa.antes_tradear = true;
    bitacoraRafa.despues_tradear = false;
    bitacoraRafa.contenido  = 'Me siento motivado quiero realizar buenas operaciones respetando mi gestion de riesgo';
    bitacoraRafa.id = 9;

    const newBitacora =  await this.feelingLogRepository.save(bitacoraRafa);
    console.log('bitacora nueva', newBitacora);
    return newBitacora;
  }

  findAll() {
    return `This action returns all feelingLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feelingLog`;
  }

  update(id: number, updateFeelingLogDto: UpdateFeelingLogDto) {
    return `This action updates a #${id} feelingLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} feelingLog`;
  }
}
