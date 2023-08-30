import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @ApiCreatedResponse({ description: 'Создание пользователя' })
  async createUser(@Body() userDto: RegistrationDto) {
    return await this.userService.createUser({ data: userDto });
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'Редактирование пользователя' })
  async updateUser(@Param('id') id: string, @Body() user: UserDto) {
    return await this.userService.updateUser({ id, data: user });
  }

  @Get(':id')
  @ApiCreatedResponse({ description: 'Получение пользователя' })
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Delete(':id')
  @ApiCreatedResponse({ description: 'Удаление пользователя' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
