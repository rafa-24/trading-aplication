import { TypeTrader } from '../enum/typeTader';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  pais: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  mercado_financiero: string;

  @IsString()
  @IsNotEmpty()
  tipo_de_trader: TypeTrader;

  @IsString()
  @IsNotEmpty()
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty()
  contraseña: string | any;
}