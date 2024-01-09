import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { TransAction } from 'utils/repositories/transaction';
import {
  Article,
  ArticleDocument,
  EditorEnum,
} from 'utils/schemas/blog/article.schema';

@Injectable()
export class ArticleEditorSeederRepository extends TransAction {
  constructor(
    @InjectModel(Article.name) protected article: Model<ArticleDocument>,
    @InjectConnection() protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  async updateEditorField() {
    const execute = async () => {
      await this.article.updateMany(
        {
          editor: undefined,
        },
        {
          $set: {
            editor: EditorEnum.wysiwyg,
          },
        },
      );

      this.logger.log(
        'В опубликованныхз статьях до 01.2024 установил текстовый редактор wysiwyg',
      );
    };

    const handleError = () => {
      this.logger.error('Ошибка установки текстового редактора wysiwyg');
    };

    await this.transaction(execute, handleError);
  }
}
