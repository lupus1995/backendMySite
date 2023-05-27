import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ProjectDto } from 'src/projects/dto/project.dto';
import { Projects, ProjectsDocument } from 'src/schemas/projects.schema';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Projects.name) private projectsModel: Model<ProjectsDocument>,
    @InjectConnection() private readonly connection: Connection,
    private readonly logger: Logger,
  ) {}

  async create({ project }: { project: ProjectDto }) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = new this.projectsModel(project);

      const savedModel = await model.save();
      await session.commitTransaction();
      return savedModel;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException(
        'Ошибка создания проекта',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }

  async update({ id, project }: { id: string; project: ProjectDto }) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = await this.projectsModel.updateOne({ _id: id }, project);
      return model;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException(
        'Ошибка редактирования проекта',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }

  public async delete(id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = await this.projectsModel.deleteOne({ _id: id });
      await session.commitTransaction();
      return model;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException(
        'Ошибка удаления проекта',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }

  public async findById(id: string) {
    try {
      const model = await this.projectsModel.findById(id);
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
        projects = await this.projectsModel
          .find({
            hidePublishedArticle: false,
            publishedAt: { $lt: new Date() },
          })
          .sort({ publishedAt: -1 });
      } else {
        projects = await this.projectsModel.find().sort({ publishedAt: -1 });
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
