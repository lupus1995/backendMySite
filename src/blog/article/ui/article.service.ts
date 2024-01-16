import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ArticleImageService } from 'blog/utils/image/article-image.service';

import { Article } from '../../../utils/schemas/blog/article.schema';
import { ImageService } from '../../utils/image/image.service';
import { ArticleRepository } from '../../utils/repositories/article.repository';
import { ArticlePaginationDto } from '../dto/article-pagination.dto';
import { CreateArticleDto } from '../dto/article.dto';

@Injectable()
export class ArticleService {
  private rootFolder = './images';

  constructor(
    private articleRepository: ArticleRepository,
    private imageService: ImageService,
    private articleImageService: ArticleImageService,
    private logger: Logger,
  ) {}

  /**
   * создание статьи
   */
  async create({
    createArticle,
  }: {
    createArticle: CreateArticleDto;
  }): Promise<Article | void> {
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

    this.articleImageService.deleteForlderWithImage({ id });

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

  // получение картинки для обложки статей
  async getFile({ id, size }: { id: string; size: string }) {
    const article = await this.articleRepository.findById(id);

    return this.imageService.getFile({
      size,
      nameImage: article.thumbnail,
      rootFolder: this.rootFolder,
    });
  }

  async uploadFile({ id, image }: { id: string; image: Express.Multer.File }) {
    return await this.articleImageService.uploadImage({ image, id });
  }
}
