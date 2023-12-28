import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { HasFilterDto } from 'utils/dto/has-filter.dto';
import { QueryPaginationDto } from 'utils/dto/query-pagination.dto';
import { BaseRepository } from 'utils/repositories/base-repository';
import {
  Message,
  MessageDocument,
} from 'utils/schemas/web-sockets/message.schema';

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

  async getCountByRoomId({ roomId }: { roomId: string }) {
    return await this.model.find({ roomId }).count();
  }

  async findById(id: string) {
    return await this.model.findById(id);
  }

  async create(message: MessageCreateDto) {
    const execute = async () => {
      const model = new this.model(message);

      const savedModel = await model.save();

      return {
        message: savedModel,
        count: await this.getCountByRoomId({ roomId: message.roomId }),
      };
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
    hasFilter = false,
    roomId,
  }: HasFilterDto & QueryPaginationDto & { roomId: string }): Promise<{
    messages: MessageDocument[];
    count: number;
  }> {
    let messages: MessageDocument[] = [];
    let count = 0;
    if (!hasFilter) {
      messages = await this.model.find({ roomId });
      count = messages.length;

      return {
        messages,
        count,
      };
    }
    messages = await this.model
      .find({ roomId })
      .sort({ _id: -1 })
      .skip(offset * limit)
      .limit(limit);

    count = await this.model.find({ roomId }).count();

    return {
      messages,
      count,
    };
  }

  async update({ id, data }: { id: string; data: MessageDto }) {
    return await this.model.findByIdAndUpdate(id, data);
  }

  async delete(id: string[]) {
    return await this.model.deleteMany({ _id: id });
  }
}
