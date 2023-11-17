import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { TransAction } from '../../../utils/repositories/transaction';
import {
  Article,
  ArticleDocument,
} from '../../../utils/schemas/blog/article.schema';
import { MainPage } from '../../../utils/schemas/blog/mainPage.schema';
import { Projects } from '../../../utils/schemas/blog/projects.schema';

@Injectable()
export class ImageSeedRepository extends TransAction {
  constructor(
    @InjectModel(Article.name) protected article: Model<ArticleDocument>,
    @InjectConnection() protected connection: Connection,
    protected logger: Logger,
    @InjectModel(MainPage.name) private readonly mainPage: Model<MainPage>,
    @InjectModel(Projects.name) private readonly projects: Model<Projects>,
  ) {
    super(connection, logger);
  }

  async getData() {
    const execute = async () => {
      const articles = await this.article.find();
      this.logger.log('Статьи получены из базы данных');
      const mainPage = await this.mainPage.find();
      this.logger.log('Главная страница получена из базы данных');
      const projects = await this.projects.find();
      this.logger.log('Проекты получены из базы данных');

      return {
        articles,
        mainPage,
        projects,
      };
    };

    const handleError = () => {
      throw 'Ошибка получения данных';
    };

    return this.transaction(execute, handleError);
  }
}
