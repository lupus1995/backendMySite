import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMainPageDto } from './main-page.dto';
import { MainPageService } from './main-page.service';

@Controller('main-page')
export class MainPageController {
    constructor(private mainPageService: MainPageService) {}
    @Post()
    async createMainPage(@Body() mainPageDto: CreateMainPageDto) {
        return await this.mainPageService.create({createMainPageDto: mainPageDto})
    }

    @Get(':id')
    async getMainPage(@Param('id') id: string) {
        return await this.mainPageService.get({id});
    }

    @Put(':id')
    async updateMainPage(@Body() mainPageDto: CreateMainPageDto, @Param('id') id: string) {
        return await this.mainPageService.update({id, createMainPageDto: mainPageDto})
    }
}
