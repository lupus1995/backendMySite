import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { ImageService } from 'src/utils/image/image.service';
import { v4 as uuid } from 'uuid';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { CreateArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
    private readonly logger: Logger;
    private rootFolder: string = './images';
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        @InjectConnection() private readonly connection: Connection,
        private imageService: ImageService,
    ) {
        this.logger = new Logger();
     }

    /**
     * создание статьи
     */
    async create({ createArticle }: { createArticle: CreateArticleDto }) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const model = new this.articleModel(createArticle);

            const imageID: string = uuid();
            model.thumbnail = await this.imageService.saveImage({
                codeImage: model.thumbnail,
                nameImage: imageID,
                rootFolder: this.rootFolder,
            });

            const savedModel = await model.save();
            await session.commitTransaction();
            return savedModel;
        } catch (e) {
            this.logger.error(e)
            await session.abortTransaction();
            throw new HttpException('Ошибка создания статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }

    }

    /**
     * редактирование статьи
     */
    async update({ createArticle, id }: { createArticle: CreateArticleDto, id: string }) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const artilce: CreateArticleDto = {...createArticle};
            const currentArticle = await this.articleModel.findById(id);
            const nameFile = currentArticle.thumbnail.substring(0, currentArticle.thumbnail.indexOf('.'));
            artilce.thumbnail = await this.imageService.saveImage({
                codeImage: artilce.thumbnail,
                nameImage: nameFile,
                rootFolder: this.rootFolder,
            });
            const model = await this.articleModel.updateOne({ _id: id }, artilce);
            await session.commitTransaction();
            return model;
        } catch (e) {
            this.logger.error(e)
            await session.abortTransaction();
            throw new HttpException('Ошибка редактирования статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }

    }

    /**
     * удаление статьи
     */
    async delete({ id }: { id: string }) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const currentArticle = await this.articleModel.findById(id);
            this.imageService.deletedFiles({nameImage: currentArticle.thumbnail, rootFolder: this.rootFolder});
            const model = await this.articleModel.deleteOne({ id });
            await session.commitTransaction();
            return model;
        } catch (e) {
            this.logger.error(e)
            await session.abortTransaction();
            throw new HttpException('Ошибка удаления статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }
    }

    /**
     * получение статьи
     */
    async getArticle({ id }: { id: string }) {
        try {
            const article = await this.articleModel.findById(id);

            article.thumbnail = this.imageService.convetFileToBase64({ nameFile: article.thumbnail, rootFolder: this.rootFolder });

            return article;
        } catch (e) {
            this.logger.error(e)
            throw new HttpException('Ошибка получения статьи', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * получение нескольких статей
     */
    async getArticles({ offset = 0, limit = 10 }: { offset: number, limit: number }) {
        try {
            const articles = await this.articleModel.find().skip(offset).limit(limit);
            return articles.map(article => {
                article.thumbnail = this.imageService.convetFileToBase64({ nameFile: article.thumbnail, rootFolder: this.rootFolder });

                return article;
            })
        } catch (e) {
            this.logger.error(e)
            throw new HttpException('Ошибка получения статей', HttpStatus.BAD_REQUEST);
        }
    }
}
