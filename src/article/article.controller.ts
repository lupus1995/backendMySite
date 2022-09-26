import { ArticleService } from './article.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateArticleDto } from './article.dto';

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService){}

    @Get()
    async getArticles( @Query('offset') offset: number,@Query('limit') limit: number) {
        return await this.articleService.getArticles({offset, limit});
    }

    @Get(':id')
    async getArticle (@Param('id') id: string) {
        return await this.articleService.getArticle({id});
    }

    @Delete(':id')
    async deleteArticle(@Param(':id') id: string) {
        return await this.articleService.delete({id})
    }

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.create({createArticle:createArticleDto})
    }

    @Put(':id')
    async updateArticle(@Param(':id') id: string, @Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.update({id, createArticle: createArticleDto})
    }
}
