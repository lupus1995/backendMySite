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
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { TokenGuard } from 'src/utils/tokens/token.guard';
import { ProjectDto } from './dto/project.dto';
import { HasFilterDto } from 'src/utils/dto/has-filter.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOkResponse({ description: 'Получение всех проектов' })
  @ApiQuery({
    type: 'boolean',
    name: 'hasFilter',
    description: 'Скрывать ранее опубликованные проекты',
  })
  async getProjects(@Query() hasFilter: HasFilterDto) {
    return this.projectsService.getProjects(hasFilter);
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  @ApiOkResponse({ description: 'Получение одного проекта' })
  async getProject(@Param('id') id: string) {
    return await this.projectsService.getProject({ id });
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Удаление проекта' })
  @ApiParam({ type: 'string', name: 'id', description: 'Id проекта' })
  async deleteArticle(@Param('id') id: string) {
    return await this.projectsService.delete({ id });
  }

  @UseGuards(TokenGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Создание проекта' })
  async createArticle(@Body() project: ProjectDto) {
    return await this.projectsService.create({
      createProject: project,
    });
  }

  @UseGuards(TokenGuard)
  @Put(':id')
  @ApiOkResponse({ description: 'Обновление проекта' })
  @ApiParam({
    type: 'string',
    name: 'id',
    description: 'Редактирование объекта с данными страницы',
  })
  async updateArticle(@Param('id') id: string, @Body() project: ProjectDto) {
    return await this.projectsService.update({
      id,
      project,
    });
  }

  @Get(':id/:size/thumbnail')
  @Header('Content-Type', 'image/jpeg')
  async getFile(@Param('id') id: string, @Param('size') size: string) {
    return await this.projectsService.getFile({ id, size });
  }
}
