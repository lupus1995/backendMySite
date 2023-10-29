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
import { InterlocutorService } from './interlocutor.service';
import { MessageService } from './message.service';
import { PrepareDataService } from './prepareData.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private interlocutorsService: InterlocutorService,
    private messageService: MessageService,
    private prapereDataService: PrepareDataService,
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
    const draftInterlocutors =
      await this.interlocutorsService.getDraftInterlocutors({
        userId: user._id,
        limit,
        offset,
      });

    const messages = await this.messageService.getMessageFromIntelocutor(
      draftInterlocutors.interlocutors,
    );

    const users = await this.userService.getUserFromInterlocutor(
      draftInterlocutors.interlocutors,
    );

    const interlocutors = this.prapereDataService.prepareInterlocutors({
      users,
      messages,
    });

    return interlocutors;
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

    const { interlocutors } =
      await this.interlocutorsService.getAllInterlocutors({
        userId: user._id,
      });

    const users = await this.userService.getUserFromInterlocutor(interlocutors);

    const filterUsers = await this.userService.searchUsers({ users, search });

    const filterMessage =
      await this.messageService.getMessagesFromFilterInterlocutor({
        interlocutors,
        users: filterUsers,
        limit,
        offset,
      });

    const searchInterlocutors =
      this.prapereDataService.prepareSearchInterlocutor({
        draftInterlocutors: interlocutors,
        interlocutors: filterUsers,
        messages: filterMessage,
      });

    return searchInterlocutors;
  }
}
