import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ProjectsRepository } from './projects.repository';
import { ImageService } from '../utils/image/image.service';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectsService {
  private logger: Logger;
  private rootFolder = './images';
  constructor(
    private projectsRepository: ProjectsRepository,
    private imageService: ImageService,
  ) {
    this.logger = new Logger();
  }

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
  async getProjects() {
    const projects = await this.projectsRepository.getAll();

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
}
