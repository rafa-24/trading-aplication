import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/newUser.dto';
import { hash } from 'src/helpers/hash';
import { RegisterInterface } from './interface/register.interface';
import { UserRegisterResponse } from './interface/response/userResponse.interface';

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

  // ver si este usuario esta en la base de datos
  async findOne(username: string): Promise<UserRegisterResponse> {
    const user = await this.userRepository.findOneBy({
      nombre_usuario: username,
    }); 
    return user as UserRegisterResponse;
  }

  // Saludar usuario -> modificar la consulta para buscar el usuario por id
  async searchUser (name: string) {
    const user = await this.userRepository.findOneBy({ nombre_usuario: name });
    return user;    
  }

  async greetUser (name: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ nombre_usuario: name });
    return `Hola ${user.nombre}`;    
  }


}
