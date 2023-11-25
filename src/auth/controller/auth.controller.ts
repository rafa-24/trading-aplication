import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/service/users.service';
import { CreateUserDto } from 'src/users/dto/newUser.dto';
import { RegisterInterface } from 'src/users/interface/register.interface';
import { SignInResponse } from 'src/users/interface/user.interface';
import { PublicAccess } from '../decorators/public.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { getUrlImage, supabase } from 'src/supabase';

class DescriptionDto {
  description: string;
}

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @PublicAccess()
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() data: CreateUserDto): Promise<RegisterInterface> {
    return await this.userService.register(data);
  }

  @PublicAccess()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() userData: UserDto): Promise<SignInResponse> {
    const { username, password } = userData;
    return await this.authService.signIn(username, password);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`folder_name/${file.originalname}`, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;
      const path = data.path; // obtener url de la foto
      const urlImage = await getUrlImage(path);
      return await this.userService.uploadPhoto(req.id, urlImage);
    } catch (error) {
      console.error('Error al subir imagen', error);
      return error;
    }
  }

  @Post('description')
  async addDescripcion(@Body() body: DescriptionDto, @Req() req: Request) {
    const id = req.id;
    const { description } = body;
    return await this.userService.addDescription(id, description);
  }

  @Get('avatar')
  async avatarUser(@Req() req: Request) {
    return await this.userService.getUserAvatar(req.id);
  }

  @Get('user-profile')
  async userProfileData(@Req() req: Request) {
    return await this.userService.userProfileData(req.id);
  }

  @Get('')
  async greetUser(@Req() req: Request) {
    return await this.userService.greetUser(req.nombre_usuario);
  }
}
