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
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { TokenGuard } from '@utils/tokens/token.guard';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';

import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // @UseGuards(TokenGuard)
  @Get('/room/:roomId')
  @ApiOkResponse({ description: 'Получение сообщений для диалога' })
  async getMessages(
    @Param('roomId') roomId: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    return await this.messageService.getMessages({ limit, offset, roomId });
  }

  @UseGuards(TokenGuard)
  @Get('/types')
  @ApiOkResponse({
    description: 'Типы сообщений',
  })
  getTypesMessage() {
    return this.messageService.getTypesMessage();
  }

  @UseGuards(TokenGuard)
  @Post()
  @ApiOkResponse({ description: 'Создание сообщения' })
  async createMessage(@Body() message: MessageCreateDto) {
    return await this.messageService.createMessage(message);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Редактирование сообщений' })
  async updateMessage(@Body() data: MessageDto, @Param() id: string) {
    return this.messageService.updateMessage({ id, data });
  }

  @Delete(':from/:to')
  async deleteMessages(@Param() to: string, @Param('from') from: string) {
    return this.messageService.deleteMessage({ from, to });
  }
}
