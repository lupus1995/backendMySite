import {
  Body,
  Controller,
  Get,
  Header,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMainPageDto } from './main-page.dto';
import { MainPageService } from './main-page.service';

@Controller('main-page')
export class MainPageController {
  private logger: Logger;
  constructor(private mainPageService: MainPageService) {
    this.logger = new Logger();
  }
  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Данные по главной странице заполнены' })
  async createMainPage(@Body() mainPageDto: CreateMainPageDto) {
    return await this.mainPageService.create({
      createMainPageDto: mainPageDto,
    });
  }

  @Get()
  @ApiOkResponse({ description: 'Получение данных для страницы' })
  async getMainPage() {
    const result = await this.mainPageService.get();
    return result;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Редактирование объекта с данными страницы',
  })
  async updateMainPage(
    @Body() mainPageDto: CreateMainPageDto,
    @Param('id') id: string,
  ) {
    return await this.mainPageService.update({
      id,
      createMainPageDto: mainPageDto,
    });
  }

  @Get(':size/:name')
  @Header('Content-Type', 'image/jpeg')
  getImage(@Param('size') size: string, @Param('name') name: string) {
    return this.mainPageService.getImage({ size, nameImage: name });
  }
}
