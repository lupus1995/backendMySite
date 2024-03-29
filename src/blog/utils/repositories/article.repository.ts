import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import {
  Article,
  ArticleDocument,
  EditorEnum,
} from '@utils/schemas/blog/article.schema';
import { ArticlePaginationDto } from 'blog/article/dto/article-pagination.dto';
import { CreateArticleDto } from 'blog/article/dto/article.dto';
import { MONGOOSE_LINK_NEST } from 'src/constants';

import { SocialRepository } from './social-repository';

@Injectable()
export class ArticleRepository extends SocialRepository<ArticleDocument> {
  constructor(
    @InjectModel(Article.name, MONGOOSE_LINK_NEST)
    protected model: Model<ArticleDocument>,
    @InjectConnection(MONGOOSE_LINK_NEST) protected connection: Connection,
    protected logger: Logger,
  ) {
    super(model, connection, logger);
  }

  public async getAll({
    offset = 0,
    limit = 10,
    hasFilter,
  }: ArticlePaginationDto): Promise<ArticleDocument[]> {
    let articles: ArticleDocument[];
    if (hasFilter) {
      articles = await this.model
        .find({ hidePublishedArticle: false, publishedAt: { $lt: new Date() } })
        .sort({ publishedAt: -1 })
        .skip(offset)
        .limit(limit);
    } else {
      articles = await this.model
        .find()
        .sort({ publishedAt: -1 })
        .skip(offset)
        .limit(limit);
    }

    return articles;
  }

  public async create(article: CreateArticleDto): Promise<Article | void> {
    const execute = async () => {
      const model = new this.model(article);

      model.editor = EditorEnum.quill;

      const savedModel = await model.save();

      return savedModel;
    };

    const handleError = () => {
      throw new HttpException('Ошибка создания статьи', HttpStatus.BAD_REQUEST);
    };

    await this.transaction(execute, handleError);
  }

  public async findById(id: string) {
    try {
      const article = await this.model.findById(id);
      return article;
    } catch (e) {
      this.logger.error(e);

      throw new HttpException(
        'Ошибка получения статьи',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getByPublichTelegram() {
    try {
      return await this.model.find({
        publishedAt: { $lt: new Date() },
        hidePublishedArticle: false,
        isPublishedlegram: false,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  public async getByPublichVk() {
    try {
      return await this.model.find({
        publishedAt: { $lt: new Date() },
        hidePublishedArticle: false,
        isPublishedVK: false,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  public async update({ id, data }: { id: string; data: CreateArticleDto }) {
    const execute = async () => {
      const model = await this.model.updateOne({ _id: id }, data);

      return model;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка редактирования статьи',
        HttpStatus.BAD_REQUEST,
      );
    };

    return this.transaction(execute, handleError);
  }

  public async delete(id: string) {
    const execute = async () => {
      const article = await this.model.deleteOne({ _id: id });
      return article;
    };

    const handleError = () => {
      throw new HttpException('Ошибка удаления статьи', HttpStatus.BAD_REQUEST);
    };

    return this.transaction(execute, handleError);
  }
}
