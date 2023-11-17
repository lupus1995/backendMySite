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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { ProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
import { HasFilterDto } from '../../utils/dto/has-filter.dto';
import { TokenGuard } from '../../utils/tokens/token.guard';

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
    return this.projectsService.getProjects({
      ...hasFilter,
      // на данный момент установил limit offset, потому что только один проект имею
      limit: 0,
      offset: 0,
    });
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
  async deleteProject(@Param('id') id: string) {
    return await this.projectsService.delete({ id });
  }

  @UseGuards(TokenGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Создание проекта' })
  async createProject(@Body() project: ProjectDto) {
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
  async updateProject(@Param('id') id: string, @Body() project: ProjectDto) {
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
