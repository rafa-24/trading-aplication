import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/newUser.dto';
import { hash } from 'src/helpers/hash';
import { RegisterInterface } from './interface/register.interface';
import { UserRegisterResponse } from './interface/response/userResponse.interface';
import { UserProfileResponse } from './interface/response/userDataprofile.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // register: crear un usuario en la base de datos (Formulario Inicial)
  async register(dataUser: CreateUserDto): Promise<RegisterInterface> {
    try {
      const newUser = this.userRepository.create({
        ...dataUser,
        contraseña: await hash(dataUser.contraseña),
      });
      await this.userRepository.save(newUser);

      return {
        error: false,
        message: 'Se ha creado usuario satisfactoriamente',
      };
    } catch (error) {
      return {
        error: true,
        message: 'Faltan campos por llenar en el formulario',
      };
    }
  }

  // ver si este usuario existe en la base de datos
  async findOne(username: string): Promise<UserRegisterResponse> {
    const user = await this.userRepository.findOneBy({
      nombre_usuario: username,
    });
    return user as UserRegisterResponse;
  }

  async greetUser(name: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ nombre_usuario: name });
    return `Hola ${user.nombre}`;
  }

  async uploadPhoto(id: number, image: Buffer): Promise<RegisterInterface> {
    try {
      // buscar usuario por id
      const user = await this.userRepository.findOneBy({ id });
      if (!user)
        throw new HttpException('unathorized', HttpStatus.UNAUTHORIZED);
      // actualizar la foto o guardarla
      const savePhoto = await this.userRepository.update(user.id, {
        foto_perfil: image,
      });
      if (savePhoto.affected) {
        return {
          error: false,
          message: 'Foto de perfil actualizada satisfactoriamente',
        };
      }
      return {
        error: true,
        message: 'Error al subir Foto',
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getUserAvatar(id: number): Promise<Buffer | string> {
    try {
      const user = await this.userRepository.findOne({ where: { id } }); // refactorizar este codigo esta duplicado
      const userAvatar = user.foto_perfil;
      if(userAvatar)  return userAvatar;
      return 'Este usuario no tiene foto de perfil'
    } catch (error) {
      console.error(error)
      return error;
    }
  }

  async userProfileData(id: number): Promise<UserProfileResponse> {
    try {
      const user = await this.userRepository.findOne({ where: {id}});
      if(!user) throw new UnauthorizedException('Usuario Invalido');
      return {
        name: user.nombre,
        country: user.pais
      }      
    } catch (error) {
      console.error(error);
      return error;      
    }
  }

  async addDescription(id: number, description: string): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user)
        throw new HttpException('unathorized', HttpStatus.UNAUTHORIZED);

      const response = await this.userRepository.update(user.id, {
        descripcion_usuario: description,
      });
      if (response.affected) {
        return {
          error: false,
          message: 'Se agrego descripcion de tu perfil',
        };
      }
      return {
        error: true,
        message: 'Error al agregar descripcion de perfil',
      };
    } catch (error) {
      console.error('error en el catch', error);
      return error;
    }
  }
}
