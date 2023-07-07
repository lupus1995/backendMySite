import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ProjectDto } from '../../projects/dto/project.dto';
import { Projects, ProjectsDocument } from '../../schemas/projects.schema';
import { BaseRepository } from './base-repository';

@Injectable()
export class ProjectsRepository extends BaseRepository<ProjectsDocument> {
  constructor(
    @InjectModel(Projects.name) protected model: Model<ProjectsDocument>,
    @InjectConnection() protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(model, connection, logger);
  }

  async create({ project }: { project: ProjectDto }) {
    const execute = async () => {
      const newModel = new this.model(project);
      const savedModel = await newModel.save();
      return savedModel;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка создания проекта',
        HttpStatus.BAD_REQUEST,
      );
    };

    this.transaction(execute, handleError);
  }

  async update({ id, data }: { id: string; data: ProjectDto }) {
    const execute = async () => {
      const model = await this.model.updateOne({ _id: id }, data);
      return model;
    };
    const handleError = () => {
      throw new HttpException(
        'Ошибка редактирования проекта',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }

  public async delete(id: string): Promise<Projects | unknown> {
    const execute = async () => {
      const project = await this.model.deleteOne({ _id: id });
      return project;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка удаления проекта',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }

  public async findById(id: string) {
    try {
      const model = await this.model.findById(id);
      return model;
    } catch (e) {
      this.logger.error(e);

      throw new HttpException('Проект не найден', HttpStatus.NOT_FOUND);
    }
  }

  public async getAll({
    hasFilter,
  }: {
    hasFilter: boolean;
  }): Promise<ProjectsDocument[]> {
    try {
      let projects: ProjectsDocument[];
      if (hasFilter) {
        projects = await this.model
          .find({
            hidePublishedArticle: false,
            publishedAt: { $lt: new Date() },
          })
          .sort({ publishedAt: -1 });
      } else {
        projects = await this.model.find().sort({ publishedAt: -1 });
      }

      return projects;
    } catch (e) {
      this.logger.error(e);

      throw new HttpException(
        'Ошибка при получении проекта',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
