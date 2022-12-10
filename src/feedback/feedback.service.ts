import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection } from "mongoose";
import { Feedback, FeedbackDocument } from "src/schemas/feedback.schema";
import { FeedbackDto } from "./feedback.dto";

@Injectable()
export class FeedbackService {
    private readonly logger: Logger;
    constructor(
        @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
        @InjectConnection() private readonly connection: Connection,
    ) {
        this.logger = new Logger();
    }

    // создание записи обратной связи
    async createFeedback ({feedback}: {feedback: FeedbackDto}) {
        const data = {...feedback};

        if (data.falseField.length > 0) {
            return null;
        }

        delete data.falseField;

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            return await this.feedbackModel.create(data);
        } catch (e) {

        } finally {
            session.endSession();
        }
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
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const models = await this.feedbackModel.deleteMany(ids);
            return models;
        } catch (e) {
            this.logger.error(e)
            throw new HttpException('Ошибка удаления сообщений с обратной связью', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }

    }
}