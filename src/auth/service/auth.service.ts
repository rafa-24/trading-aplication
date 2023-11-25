import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/service/users.service';
import { SignInResponse } from 'src/users/interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { isEqual } from 'src/helpers/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      const equal = await isEqual(pass, user.contraseña);
      if (equal) {
        const payload = {
          id: user.id,
          nombre_usuario: user.nombre_usuario,
        };
        return {
          error: false,
          accessToken: await this.jwtService.signAsync(payload),
        } as SignInResponse;
      }
      return {
        error: true,
        message: 'Credenciales incorrectas',
      } as SignInResponse;
    }
    return {
      error: true,
      message: 'Este usuario no existe',
    } as SignInResponse;
  }
}
