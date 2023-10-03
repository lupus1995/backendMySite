import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { TransAction } from 'src/utils/repositories/transaction';
import {
  Message,
  MessageDocument,
  MessageType,
} from 'src/utils/schemas/web-sockets/message.schema';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';

@Injectable()
export class MessageRepository extends TransAction {
  constructor(
    @InjectModel(Message.name, MONGOOSE_LINK_SOCKETS)
    protected messageModel: Model<MessageDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS) protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  async findInterlocutors({
    user,
    limit,
    offset,
  }: { user: UserType } & QueryPaginationDto) {
    const execute = async () => {
      return await this.messageModel.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: { _id: null, uniqueValues: { $addToSet: '$to' } },
        },
        {
          $limit: limit,
        },
        {
          $skip: offset,
        },
      ]);
      // .distinct('to', { from: user._id })
      // .find({ from: user._id }, 'to')
      // .sort({ createdAt: -1 })
      // .skip(offset)
      // .limit(limit);
    };

    const handleError = () => {
      this.logger.error('ошибка поиска сообщений по отправителю');
    };

    return await this.transaction(execute, handleError);
  }
}
