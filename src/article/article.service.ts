import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ImageService } from '../utils/image/image.service';
import { v4 as uuid } from 'uuid';
import { CreateArticleDto } from './dto/article.dto';
import { ArticleRepository } from '../utils/repositories/article.repository';
import { ArticlePaginationDto } from './dto/article-pagination.dto';

@Injectable()
export class ArticleService {
  private readonly logger: Logger;
  private rootFolder = './images';
  constructor(
    private articleRepository: ArticleRepository,
    private imageService: ImageService,
  ) {
    this.logger = new Logger();
  }

  /**
   * создание статьи
   */
  async create({ createArticle }: { createArticle: CreateArticleDto }) {
    const model = {
      ...createArticle,
      thumbnail: await this.imageService.saveImageBase64({
        code: createArticle.thumbnail,
        name: uuid(),
        rootFolder: this.rootFolder,
      }),
    };

    const article = await this.articleRepository.create(model);

    return article;
  }

  /**
   * редактирование статьи
   */
  async update({
    createArticle,
    id,
  }: {
    createArticle: CreateArticleDto;
    id: string;
  }) {
    const article: CreateArticleDto = { ...createArticle };
    const currentArticle = await this.articleRepository.findById(id);

    const nameFile = currentArticle.thumbnail.substring(
      0,
      currentArticle.thumbnail.indexOf('.'),
    );
    article.thumbnail = await this.imageService.saveImageBase64({
      code: article.thumbnail,
      name: nameFile,
      rootFolder: this.rootFolder,
    });

    const model = await this.articleRepository.update({ id, data: article });

    return model;
  }

  /**
   * удаление статьи
   */
  async delete({ id }: { id: string }) {
    const article = await this.articleRepository.findById(id);
    this.imageService.deletedFiles({
      nameImage: article.thumbnail,
      rootFolder: this.rootFolder,
    });

    const model = this.articleRepository.delete(id);

    return model;
  }

  /**
   * получение статьи
   */
  async getArticle({ id }: { id: string }) {
    try {
      const article = await this.articleRepository.findById(id);

      return article;
    } catch (e) {
      this.logger.error(e);
    }
  }

  /**
   * получение нескольких статей
   */
  async getArticles({
    offset = 0,
    limit = 10,
    hasFilter = false,
  }: ArticlePaginationDto) {
    try {
      const articles = await this.articleRepository.getAll({
        offset,
        limit,
        hasFilter,
      });

      return articles.map((article) => ({
        description: article.description,
        publishedAt: article.publishedAt,
        thumbnail: article.thumbnail,
        title: article.title,
        _id: article._id,
      }));
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Ошибка получения статей',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFile({ id, size }: { id: string; size: string }) {
    const article = await this.articleRepository.findById(id);

    return this.imageService.getFile({
      size,
      nameImage: article.thumbnail,
      rootFolder: this.rootFolder,
    });
  }
}
