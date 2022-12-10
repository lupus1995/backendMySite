import { AuthGuard } from './../auth/auth.guard';
import { ArticleService } from './article.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateArticleDto } from './article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { QueryPaginationDto } from '../utils/dto/query-pagination.dto';

@Controller('articles')
export class ArticleController {
    constructor(private articleService: ArticleService){}

    @UseGuards(AuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Получение нескольких статей' })
    @ApiQuery({type: 'string', name: 'offset', description: 'Количество статей, которое нужно отступить от начала отсчета'})
    @ApiQuery({type: 'string', name: 'limit', description: 'Лимит статей на странице'})
    async getArticles( @Query() queryPagination: QueryPaginationDto) {
        return await this.articleService.getArticles(queryPagination);
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Получение всей информации для определенной статьи' })
    @ApiParam({type: 'string', name: 'id', description: 'Id статьи'})
    async getArticle (@Param('id') id: string) {
        return await this.articleService.getArticle({id});
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Удаление статьи' })
    @ApiParam({type: 'string', name: 'id', description: 'Id статьи'})
    async deleteArticle(@Param('id') id: string) {
        return await this.articleService.delete({id})
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiCreatedResponse({description: 'Создание статьи'})
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.create({createArticle:createArticleDto})
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiOkResponse({ description: 'The resource was updated successfully' })
    @ApiParam({type: 'string', name: 'id', description: 'Редактирование объекта с данными страницы'})
    async updateArticle(@Param('id') id: string, @Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.update({id, createArticle: createArticleDto})
    }
}
