import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection } from "mongoose";
import { Article } from "src/schemas/article.schema";
import { FeedbackDocument } from "src/schemas/feedback.schema";

@Injectable()
export class FeedbackService {
    private readonly logger: Logger;
    constructor(
        @InjectModel(Article.name) private feedbackModel: Model<FeedbackDocument>,
        @InjectConnection() private readonly connection: Connection,
    ) {
        this.logger = new Logger();
    }

    // получение сообщений с обратной связью
    async getFeedback({ offset = 0, limit = 10 }: { offset: number, limit: number }) {
        try {
            return await this.feedbackModel.find().skip(offset).limit(limit);
        } catch (e) {
            this.logger.error(e)
            throw new HttpException('Ошибка получения сообщений с обратной связью', HttpStatus.BAD_REQUEST);
        }
    }

    // удаление сообщение с обратной связью
    async deletedFeedback ({ids}: {ids: string[]}) {
        try {
            const models = await this.feedbackModel.deleteMany(ids);
            return models;
        } catch (e) {
            this.logger.error(e)
            throw new HttpException('Ошибка удаления сообщений с обратной связью', HttpStatus.BAD_REQUEST);
        }

    }
}