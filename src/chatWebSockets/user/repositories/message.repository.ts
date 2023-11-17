import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { TransAction } from 'src/utils/repositories/transaction';
import {
  Message,
  MessageDocument,
} from 'src/utils/schemas/web-sockets/message.schema';

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

  async getMessagesByRoomId(roomId: string) {
    const execute = async (): Promise<MessageDocument> => {
      return await this.messageModel.findOne(
        { roomId },
        {},
        { sort: { createdAt: -1 }, limit: 1 },
      );
    };

    const handleError = () => {
      this.logger.debug('Ошибка получения сообщений');
    };

    return await this.transaction(execute, handleError);
  }
}
