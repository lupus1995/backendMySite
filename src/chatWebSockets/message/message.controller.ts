import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':from/:to')
  @ApiOkResponse({ description: 'Получение статей для диалога' })
  async getMessages(
    @Param('from') from: string,
    @Param('to') to: string,
    @Query() { limit, offset }: QueryPaginationDto,
  ) {
    return await this.messageService.getMessages({ to, limit, offset, from });
  }

  @Post()
  @ApiOkResponse({ description: 'Создание сообщения' })
  async createMessage(@Body() message: MessageCreateDto) {
    return await this.messageService.createMessage(message);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Редактирование сообщений' })
  async updateMessage(@Body() data: MessageDto, @Param() id: string) {
    this.messageService.updateMessage({ id, data });
  }

  @Delete(':from/:to')
  async deleteMessages(@Param() to: string, @Param('from') from: string) {
    this.messageService.deteteMessage({ from, to });
  }
}
