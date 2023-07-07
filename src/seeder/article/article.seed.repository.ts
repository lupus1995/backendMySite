import { Injectable, Logger } from '@nestjs/common';
import { TransAction } from '../../utils/repositories/transaction';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Article, ArticleDocument } from '../../schemas/article.schema';

@Injectable()
export class ArticleSeedRepository extends TransAction {
  constructor(
    @InjectModel(Article.name) protected article: Model<ArticleDocument>,
    @InjectConnection() protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  async updateMany() {
    const execute = async () => {
      await this.article.updateMany(
        {
          isPublishedVK: undefined,
          isPublishedlegram: undefined,
        },
        {
          $set: {
            isPublishedVK: true,
            isPublishedlegram: true,
          },
        },
      );
    };

    const handleError = () => {
      this.logger.error(
        'Ошибка обновления статуса публикации постов в вк и телеграм',
      );
    };

    this.transaction(execute, handleError);
  }
}
