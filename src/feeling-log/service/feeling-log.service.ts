import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFeelingLogDto } from '../dto/create-feeling-log.dto';
import { UpdateFeelingLogDto } from '../dto/update-feeling-log.dto';
import { EmotionalLog } from 'src/entity/emotionalLog.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CreateInterfaceResponse } from '../interface/create.interface';
import { searchUser } from 'src/helpers/searchUser';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmotionalLog } from '../interface/userEmotinalLog.interface';

@Injectable()
export class FeelingLogService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(
    feelingLogData: CreateFeelingLogDto,
    userId: number,
  ): Promise<CreateInterfaceResponse> {
    try {
      const user = await searchUser(this.userRepo, userId);
      if (!user) throw new UnauthorizedException('Usuario invalido');

      const newFeelingLog = new EmotionalLog();
      newFeelingLog.estado_emocional = feelingLogData.estado_emocional;
      newFeelingLog.antes_tradear = feelingLogData.antes_tradear;
      newFeelingLog.despues_tradear = feelingLogData.despues_tradear;
      newFeelingLog.contenido = feelingLogData.contenido;
      newFeelingLog.user = user;

      const feelingLogInstance = this.entityManager.create(
        EmotionalLog,
        newFeelingLog,
      );
      const response = await this.entityManager.save(feelingLogInstance);

      if (response) {
        return {
          error: false,
          message:
            'Se ha creado una nueva Bitacora emocional de manera exitosa',
        };
      }
      return {
        error: true,
        message: 'Error al crear Bitacora emocional',
      };
    } catch (error) {
      console.error('Error al crear bitacora emocional', error);
      return error;
    }
  }

  async findAll(userId: number): Promise<Array<UserEmotionalLog> | any> {
    try {
      const user = await searchUser(this.userRepo, userId);
      if (!user) throw new UnauthorizedException('Usuario invalido');

      // buscar bitacora de este usuario
      const userLogs = await this.entityManager.find(EmotionalLog, {
        where: { user },
      });
      if (userLogs.length) return userLogs;
      return [];
    } catch (error) {
      console.error('error', error);
    }
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
