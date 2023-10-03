import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Headers,
  Logger,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { TokenGuard } from 'src/utils/tokens/token.guard';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { TokensService } from 'src/utils/tokens/tokens.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger,
    private tokenService: TokensService,
  ) {}

  @UseGuards(TokenGuard)
  @Get('/interlocutors')
  @ApiCreatedResponse({
    description: 'Получение получение списка собеседников',
  })
  getInterlocutor(
    @Headers('authorization') authorization: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    const username = this.tokenService.getUserNameByToken(authorization);
    const interlocutors = this.userService.getInterlocutors({
      username,
      limit,
      offset,
    });

    return interlocutors;
  }

  // @Post()
  // @ApiCreatedResponse({ description: 'Создание пользователя' })
  // async createUser(@Body() userDto: RegistrationDto) {
  //   return await this.userService.createUser({ data: userDto });
  // }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Редактирование пользователя' })
  // async updateUser(@Param('id') id: string, @Body() user: UserDto) {
  //   return await this.userService.updateUser({ id, data: user });
  // }

  // @Get(':id')
  // @ApiCreatedResponse({ description: 'Получение пользователя' })
  // async getUser(@Param('id') id: string) {
  //   return await this.userService.getUser(id);
  // }

  // @Delete(':id')
  // @ApiCreatedResponse({ description: 'Удаление пользователя' })
  // async deleteUser(@Param('id') id: string) {
  //   return await this.userService.deleteUser(id);
  // }
}
