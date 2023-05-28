import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Feedback, FeedbackDocument } from '../../schemas/feedback.schema';
import { BaseRepository } from './base-repository';

@Injectable()
export class FeedbackRepository extends BaseRepository<FeedbackDocument> {
  constructor(
    @InjectModel(Feedback.name) protected model: Model<FeedbackDocument>,
    @InjectConnection() protected readonly connection: Connection,
    protected logger: Logger,
  ) {
    super(model, connection, logger);
  }

  public async create(feedback: Feedback) {
    const execute = async () => {
      const model = new this.model(feedback);

      const savedModel = await model.save();

      return savedModel;
    };

    const handleError = () => {
      throw new HttpException('Ошибка создания отзыва', HttpStatus.BAD_REQUEST);
    };

    return await this.transaction(execute, handleError);
  }

  public async findById(id: string) {
    try {
      const feedback = await this.model.findById(id);
      return feedback;
    } catch (e) {
      this.logger.error(e);

      throw new HttpException(
        'Ошибка получения статьи',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async update({ id, data }: { id: string; data: Feedback }) {
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

    return await this.transaction(execute, handleError);
  }

  public async getAll({
    offset = 0,
    limit = 10,
  }: {
    offset: number;
    limit: number;
  }) {
    try {
      return await this.model.find().skip(offset).limit(limit);
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Ошибка получения сообщений с обратной связью',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async delete(ids: string[]) {
    const execute = async () => {
      const models = await this.model.deleteMany(ids);
      return models;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка удаления сообщений с обратной связью',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }
}
