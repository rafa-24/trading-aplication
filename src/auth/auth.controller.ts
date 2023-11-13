import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/newUser.dto';
import { RegisterInterface } from 'src/users/interface/register.interface';
import { SignInResponse } from 'src/users/interface/user.interface';
import { PublicAccess } from './decorators/public.decorator';
import { AuthGuard } from './guards/auth.guard';
import {Request} from "express";

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @PublicAccess()
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() data: CreateUserDto):Promise<RegisterInterface> {
    return await this.userService.register(data);
  }

  @PublicAccess()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() userData: UserDto): Promise<SignInResponse> {
    const { username, password } = userData;
    return await this.authService.signIn(username, password);
  }
  
  
  @Get()
  async greetUser(@Req() req: Request) {
    return await this.userService.greetUser(req.nombre_usuario);
  }
}
