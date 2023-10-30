import {
  Controller,
  Get,
  Query,
  UseGuards,
  Headers,
  Logger,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { TokenGuard } from 'src/utils/tokens/token.guard';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { TokensService } from 'src/utils/tokens/tokens.service';
import { MessageService } from './message.service';
import { RoomsService } from './rooms.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private roomsService: RoomsService,
    private messageService: MessageService,
    private logger: Logger,
    private tokenService: TokensService,
  ) {}

  @UseGuards(TokenGuard)
  @Get('/interlocutors')
  @ApiCreatedResponse({
    description: 'Получение получение списка собеседников',
  })
  async getInterlocutor(
    @Headers('authorization') authorization: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    const username = this.tokenService.getUserNameByToken(authorization);
    const user = await this.userService.findByUsername({ username });

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
  async searchInterlocutor(
    @Headers('authorization') authorization: string,
    @Query('search') search: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    const username = this.tokenService.getUserNameByToken(authorization);
    const user = await this.userService.findByUsername({ username });

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
}
