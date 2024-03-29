import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { ArticleService } from './article.service';
import { TokenGuard } from '../../../utils/tokens/token.guard';
import { ArticleGuard } from '../article.guard';
import { ArticleUpdatePipe } from '../article.update.pipe';
import { ArticlePaginationDto } from '../dto/article-pagination.dto';
import { CreateArticleDto } from '../dto/article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @ApiOkResponse({ description: 'Получение нескольких статей' })
  @ApiQuery({
    type: 'string',
    name: 'offset',
    description: 'Количество статей, которое нужно отступить от начала отсчета',
  })
  @ApiQuery({
    type: 'string',
    name: 'limit',
    description: 'Лимит статей на странице',
  })
  @ApiQuery({
    type: 'boolean',
    name: 'hasFilter',
    description: 'Скрывать ранее опубликованные статьи',
  })
  async getArticles(@Query() queryPagination: ArticlePaginationDto) {
    return await this.articleService.getArticles(queryPagination);
  }

  @Get(':id')
  @UseGuards(ArticleGuard)
  @ApiOkResponse({
    description: 'Получение всей информации для определенной статьи',
  })
  @ApiParam({ type: 'string', name: 'id', description: 'Id статьи' })
  async getArticle(@Param('id') id: string) {
    return await this.articleService.getArticle({ id });
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Удаление статьи' })
  @ApiParam({ type: 'string', name: 'id', description: 'Id статьи' })
  async deleteArticle(@Param('id') id: string) {
    return await this.articleService.delete({ id });
  }

  @UseGuards(TokenGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Создание статьи' })
  @UsePipes(ArticleUpdatePipe)
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create({
      createArticle: createArticleDto,
    });
  }

  @UseGuards(TokenGuard)
  @Put(':id')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Редактирование объекта с данными страницы',
  })
  async updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articleService.update({
      id,
      createArticle: createArticleDto,
    });
  }

  @UseGuards(TokenGuard)
  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'Загрузка картинки для статьи' })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const path = await this.articleService.uploadFile({ id, image: file });

    return { path };
  }

  @ApiOkResponse({ description: 'Получение картинки для социальных сетей' })
  @Get(':size/:id/thumbnail')
  @Header('Content-Type', 'image/jpeg')
  async getFile(@Param('id') id: string, @Param('size') size: string) {
    return await this.articleService.getFile({ id, size });
  }
}
