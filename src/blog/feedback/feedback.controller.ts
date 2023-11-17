import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { FeedbackDto } from './feedback.dto';
import { FeedbackService } from './feedback.service';
import { QueryPaginationDto } from '../../utils/dto/query-pagination.dto';
import { TokenGuard } from '../../utils/tokens/token.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbakService: FeedbackService) {}

  @Post()
  @ApiParam({
    type: 'object',
    name: 'data',
    description:
      'Данные для создания записи обратной связи с формы на главном экране',
  })
  @ApiOkResponse({
    description: 'Создание записи обратной связи с формы на главном экране',
  })
  async createFeedback(@Body() data: FeedbackDto) {
    return await this.feedbakService.createFeedback({ feedback: data });
  }

  @UseGuards(TokenGuard)
  @Get()
  @ApiOkResponse({
    description: 'Получение нескольких сообщеий об обратной связи',
  })
  @ApiQuery({
    type: 'string',
    name: 'offset',
    description:
      'Количество сообщений, которое нужно отступить от начала отсчета',
  })
  @ApiQuery({
    type: 'string',
    name: 'limit',
    description: 'Лимит сообщений на странице',
  })
  async getFeedback(@Query() queryPagination: QueryPaginationDto) {
    return await this.feedbakService.getFeedback(queryPagination);
  }

  @UseGuards(TokenGuard)
  @ApiOkResponse({
    description: 'Удаление нескольких отзывов, если они не корректны',
  })
  @Delete()
  async deletedFeedback(@Body() ids: string[]) {
    return await this.feedbakService.deletedFeedback({ ids });
  }
}
