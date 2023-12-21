import {
  Controller,
  Get,
  Query,
  UseGuards,
  Headers,
  Param,
  Logger,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { TokenGuard } from 'src/utils/tokens/token.guard';
import { TokensService } from 'src/utils/tokens/tokens.service';

import { MessageService } from './message.service';
import { RoomsService } from './rooms.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private roomsService: RoomsService,
    private messageService: MessageService,
    private tokenService: TokensService,
    private logger: Logger,
  ) {}

  private async getUserFromAuthorization({
    authorization,
  }: {
    authorization: string;
  }) {
    const username = this.tokenService.getUserNameByToken(authorization);
    const user = await this.userService.findByUsername({ username });

    return user;
  }

  @UseGuards(TokenGuard)
  @Get()
  @ApiCreatedResponse({
    description: 'Получение данных о самом пользователе',
  })
  async getDataUser(@Headers('authorization') authorization: string) {
    return await this.getUserFromAuthorization({ authorization });
  }

  @UseGuards(TokenGuard)
  @Get('/interlocutors')
  @ApiCreatedResponse({
    description: 'Получение получение списка собеседников',
  })
  async getInterlocutors(
    @Headers('authorization') authorization: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    const user = await this.getUserFromAuthorization({ authorization });

    const draftData = await this.roomsService.getRooms({ userId: user._id });

    const dataWithMessage = await this.messageService.getMessages({
      roomsIds: draftData.map((item) => item._id),
      limit,
      offset,
    });

    const dataWithInterlocutor = await this.userService.findInterlocutors({
      data: draftData,
      currentUser: user,
    });

    const data = dataWithMessage.map((itemMessage) => ({
      ...itemMessage,
      interlocutor: dataWithInterlocutor.find(
        (itemInterlocutor) => itemMessage.id === itemInterlocutor.id,
      )?.interlocutor,
    }));

    return data;
  }

  @UseGuards(TokenGuard)
  @Get('/seach-interlocutors')
  @ApiCreatedResponse({
    description: 'Получение получение списка собеседников',
  })
  async searchInterlocutors(
    @Headers('authorization') authorization: string,
    @Query('search') search: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    const user = await this.getUserFromAuthorization({ authorization });

    const draftData = await this.roomsService.getRooms({ userId: user._id });

    const users = await this.userService.findInterlocutors({
      data: draftData,
      currentUser: user,
      search,
    });

    const dataWithMessage = await this.messageService.getMessages({
      roomsIds: users.map((item) => item.id),
      limit,
      offset,
    });

    const data = users.map((itemInterlocutor) => ({
      ...itemInterlocutor,
      message: dataWithMessage.find(
        (itemMessage) => itemMessage.id === itemInterlocutor.id,
      )?.message,
    }));

    return data;
  }

  @UseGuards(TokenGuard)
  @Get('/room/:roomId')
  @ApiCreatedResponse({
    description: 'Получение данных по одному собеседнику',
  })
  async getInterlocutor(@Param('roomId') roomId: string) {
    const message = await this.messageService.getMessagesByRoomId({ roomId });

    const interlocutor = await this.userService.findById({
      userId: message.to,
    });

    return {
      id: roomId,
      interlocutor,
      message,
    };
  }
}
