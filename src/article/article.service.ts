import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/schemas/article.schema';
import { CreateArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

    async create ({createArticle}:{createArticle: CreateArticleDto}) {
        const model = new this.articleModel(createArticle);
        return model.save();
    }

    async update ({createArticle, id}:{createArticle: CreateArticleDto, id: string}) {
        return await this.articleModel.updateOne({id}, createArticle)
    }

    async delete ({id}: {id: string}) {
        return await this.articleModel.deleteOne({id});
    }

    async getArticle ({id}: {id: string}) {
        return await this.articleModel.findById(id);
    }

    async getArticles ({ offset = 0, limit = 10 }: {offset?: number, limit?: number}) {
        return this.articleModel.collection.find().skip(offset).limit(limit);
    }
}
