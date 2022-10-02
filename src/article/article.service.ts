import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Article, ArticleDocument } from 'src/schemas/article.schema';
import { CreateArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        @InjectConnection() private readonly connection: Connection,
        ) {}

    /**
     * создание статьи
     */
    async create ({createArticle}:{createArticle: CreateArticleDto}) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const model = new this.articleModel(createArticle);
            const savedModel = await model.save();
            await session.commitTransaction();
            return savedModel;
        } catch (e) {
            await session.abortTransaction();
            throw new HttpException('Ошибка создания статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }
        
    }

    /**
     * редактирование статьи
     */
    async update ({createArticle, id}:{createArticle: CreateArticleDto, id: string}) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const model = await this.articleModel.updateOne({id}, createArticle)
            await session.commitTransaction();
            return model;
        } catch (e) {
            await session.abortTransaction();
            throw new HttpException('Ошибка редактирования статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }

    }

    /**
     * удаление статьи
     */
    async delete ({id}: {id: string}) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const model = await this.articleModel.deleteOne({id});
            await session.commitTransaction();
            return model;
        } catch (e) {
            await session.abortTransaction();
            throw new HttpException('Ошибка удаления статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }
    }

    /**
     * получение статьи
     */
    async getArticle ({id}: {id: string}) {
        return await this.articleModel.findById(id);
    }

    /**
     * получение нескольких статей
     */
    async getArticles ({ offset = 0, limit = 10 }: {offset: number, limit: number}) {
        return this.articleModel.find().skip(offset).limit(limit)
    }
}
