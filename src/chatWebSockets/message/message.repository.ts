/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from 'src/utils/repositories/base-repository';
import {
  Message,
  MessageDocument,
} from '../../utils/schemas/web-sockets/message.schema';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { HasFilterDto } from 'src/utils/dto/has-filter.dto';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(
    @InjectModel(Message.name, MONGOOSE_LINK_SOCKETS)
    protected model: Model<MessageDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(model, connection, logger);
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async create(message: MessageCreateDto) {
    const execute = async () => {
      const model = new this.model(message);

      const savedModel = await model.save();

      return savedModel;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка создания сообщения',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }

  async getMessagesByFromAndTo({ from, to }: { from: string; to: string }) {
    return await this.model.find({ from, to });
  }

  async getAll({
    offset,
    limit,
    from,
    hasFilter = false,
    to,
  }: HasFilterDto & QueryPaginationDto & { from: string; to: string }) {
    if (!hasFilter) {
      return await this.getMessagesByFromAndTo({ from, to });
    }
    return await this.model
      .find({ to, from })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
  }

  async update({ id, data }: { id: string; data: MessageDto }) {
    return await this.model.findByIdAndUpdate(id, data);
  }

  async delete(id: string[]) {
    return await this.model.deleteMany({ _id: id });
  }
}
