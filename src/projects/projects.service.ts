import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ImageService } from '../utils/image/image.service';
import { ProjectDto } from './dto/project.dto';
import { HasFilterDto } from '../utils/dto/has-filter.dto';
import { ProjectsRepository } from 'src/utils/repositories/projects.repository';

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
      thumbnail: await this.imageService.saveImage({
        codeImage: createProject.thumbnail,
        nameImage: uuid(),
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
    const thumbnail = await this.imageService.saveImage({
      codeImage: project.thumbnail,
      nameImage: nameFile,
      rootFolder: this.rootFolder,
    });

    const model = await this.projectsRepository.update({
      id,
      project: {
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
  async getProjects({ hasFilter }: HasFilterDto) {
    const projects = await this.projectsRepository.getAll({ hasFilter });

    return projects;
  }

  async getFile({ id }: { id: string }) {
    const project = await this.projectsRepository.findById(id);

    return this.imageService.getFile({
      size: '510',
      nameImage: project.thumbnail,
      rootFolder: this.rootFolder,
    });
  }

  async getProject({ id }: { id: string }) {
    const project = await this.projectsRepository.findById(id);

    return project;
  }
}
