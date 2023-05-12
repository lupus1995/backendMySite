import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { ArticlePaginationDto } from './dto/article-pagination.dto';
import { CreateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleRepository {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.logger = new Logger();
  }

  public async getAll({
    offset = 0,
    limit = 10,
    hasFilter,
  }: ArticlePaginationDto): Promise<ArticleDocument[]> {
    let articles;
    if (hasFilter) {
      articles = await this.articleModel
        .find({ hidePublishedArticle: false, publishedAt: { $lt: new Date() } })
        .sort({ publishedAt: -1 })
        .skip(offset)
        .limit(limit);
    } else {
      articles = await this.articleModel
        .find()
        .sort({ publishedAt: -1 })
        .skip(offset)
        .limit(limit);
    }

    return articles;
  }

  public async create(article: CreateArticleDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = new this.articleModel(article);

      const savedModel = await model.save();
      await session.commitTransaction();
      return savedModel;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException('Ошибка создания статьи', HttpStatus.BAD_REQUEST);
    } finally {
      session.endSession();
    }
  }

  public async findById(id: string) {
    try {
      const model = await this.articleModel.findById(id);
      return model;
    } catch (e) {
      this.logger.error(e);

      throw new HttpException(
        'Ошибка редактирования статьи',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getByPublichTelegram() {
    try {
      return await this.articleModel.find({
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
      return await this.articleModel.find({
        publishedAt: { $lt: new Date() },
        hidePublishedArticle: false,
        isPublishedVK: false,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  public async update({
    id,
    article,
  }: {
    id: string;
    article: CreateArticleDto;
  }) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = await this.articleModel.updateOne({ _id: id }, article);

      return model;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException(
        'Ошибка редактирования статьи',
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
      const model = await this.articleModel.deleteOne({ _id: id });
      await session.commitTransaction();
      return model;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException('Ошибка удаления статьи', HttpStatus.BAD_REQUEST);
    } finally {
      session.endSession();
    }
  }
}
