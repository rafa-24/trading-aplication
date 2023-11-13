import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { useToken } from 'src/helpers/jwt';
import { ValidateToken } from '../interface/response/jwtInterface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Leer el decorador publico
    const isPublic = this.reflector.get<boolean>(
      'public-key',
      context.getHandler(),
    );

    if (isPublic) return true;

    // Leer el header de la peticion
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['token_access']; // Obtener token por headers

    if (!token || Array.isArray(token)) throw new UnauthorizedException('El token es invalido');

    const manageToken: ValidateToken | string = useToken(token);

    if (typeof manageToken === 'string') throw new UnauthorizedException(manageToken);
    if (manageToken.isExpired) throw new UnauthorizedException('Su token ha expirado');

    const { nombre_usuario } = manageToken;

    const user = await this.userService.searchUser(nombre_usuario);

    if (!user) throw new UnauthorizedException('Usuario invalido');

    req.id = user.id;
    req.nombre_usuario = user.nombre_usuario;

    return true;
  }
}
