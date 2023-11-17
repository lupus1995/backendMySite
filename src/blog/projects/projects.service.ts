import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';

import { ProjectDto } from './dto/project.dto';
import { HasFilterDto } from '../../utils/dto/has-filter.dto';
import { ImageService } from '../utils/image/image.service';
import { ProjectsRepository } from '../utils/repositories/projects.repository';

@Injectable()
export class ProjectsService {
  private rootFolder = './images';
  constructor(
    private projectsRepository: ProjectsRepository,
    private imageService: ImageService,
  ) {}

  /**
   * создание проекта
   */
  async create({ createProject }: { createProject: ProjectDto }) {
    const model = {
      ...createProject,
      thumbnail: await this.imageService.saveImageBase64({
        code: createProject.thumbnail,
        name: uuid(),
        rootFolder: this.rootFolder,
      }),
    };

    const article = await this.projectsRepository.create({ project: model });

    return article;
  }

  /**
   * редактирование проекта
   */
  async update({ project, id }: { project: ProjectDto; id: string }) {
    const currentArticle = await this.projectsRepository.findById(id);

    const nameFile = currentArticle.thumbnail.substring(
      0,
      currentArticle.thumbnail.indexOf('.'),
    );
    const thumbnail = await this.imageService.saveImageBase64({
      code: project.thumbnail,
      name: nameFile,
      rootFolder: this.rootFolder,
    });

    const model = await this.projectsRepository.update({
      id,
      data: {
        ...project,
        thumbnail,
      },
    });

    return model;
  }

  /**
   * удаление проекта
   */
  async delete({ id }: { id: string }) {
    const article = await this.projectsRepository.findById(id);
    this.imageService.deletedFiles({
      nameImage: article.thumbnail,
      rootFolder: this.rootFolder,
    });

    const model = this.projectsRepository.delete(id);

    return model;
  }

  /**
   * получение нескольких статей
   */
  async getProjects({
    hasFilter,
    limit,
    offset,
  }: HasFilterDto & QueryPaginationDto) {
    const projects = await this.projectsRepository.getAll({
      hasFilter,
      limit,
      offset,
    });

    return projects;
  }

  async getFile({ id, size }: { id: string; size: string }) {
    const project = await this.projectsRepository.findById(id);

    return this.imageService.getFile({
      size,
      nameImage: project.thumbnail,
      rootFolder: this.rootFolder,
    });
  }

  async getProject({ id }: { id: string }) {
    const project = await this.projectsRepository.findById(id);

    return project;
  }
}
