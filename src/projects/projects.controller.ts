import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectDto } from './project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  @ApiOkResponse({ description: 'Получение нескольких статей' })
  async getProjects() {
    return this.projectsService.getProjects();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Удаление проекта' })
  @ApiParam({ type: 'string', name: 'id', description: 'Id проекта' })
  async deleteArticle(@Param('id') id: string) {
    return await this.projectsService.delete({ id });
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Создание проекта' })
  async createArticle(@Body() project: ProjectDto) {
    return await this.projectsService.create({
      createProject: project,
    });
  }

  @UseGuards(AuthGuard)
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

  @Get(':id/thumbnail')
  @Header('Content-Type', 'image/jpeg')
  async getFile(@Param('id') id: string) {
    return await this.projectsService.getFile({ id });
  }
}
