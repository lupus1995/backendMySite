import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CreateMainPageDto } from './main-page.dto';
import { MainPageService } from './main-page.service';

@Controller('main-page')
export class MainPageController {
    constructor(private mainPageService: MainPageService) {}
    @Post()
    @ApiCreatedResponse({ description: 'Данные по главной странице заполнены' })
    async createMainPage(@Body() mainPageDto: CreateMainPageDto) {
        return await this.mainPageService.create({createMainPageDto: mainPageDto})
    }

    @Get(':id')
    @ApiParam({type: 'string', name: 'id', description: 'Получение объекта с данными для страницы'})
    @ApiOkResponse({ description: 'Получение данных для страницы' })
    async getMainPage(@Param('id') id: string) {
        return await this.mainPageService.get({id});
    }

    @Put(':id')
    @ApiOkResponse({ description: 'The resource was updated successfully' })
    @ApiParam({type: 'string', name: 'id', description: 'Редактирование объекта с данными страницы'})
    async updateMainPage(@Body() mainPageDto: CreateMainPageDto, @Param('id') id: string) {
        return await this.mainPageService.update({id, createMainPageDto: mainPageDto})
    }
}
