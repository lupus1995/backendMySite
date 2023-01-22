import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Feedback, FeedbackDocument } from '../schemas/feedback.schema';

@Injectable()
export class FeedbackRepository {
  private readonly logger: Logger;
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.logger = new Logger();
  }

  public async create(feedback: Feedback) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      return await this.feedbackModel.create(feedback);
    } catch (e) {
    } finally {
      session.endSession();
    }
  }

  public async get({
    offset = 0,
    limit = 10,
  }: {
    offset: number;
    limit: number;
  }) {
    try {
      return await this.feedbackModel.find().skip(offset).limit(limit);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Ошибка получения сообщений с обратной связью',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async delete({ ids }: { ids: string[] }) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const models = await this.feedbackModel.deleteMany(ids);
      return models;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Ошибка удаления сообщений с обратной связью',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }
}
