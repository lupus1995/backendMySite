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

  async getMessages(messageIds: string[]) {
    const execute = async () => {
      return await this.messageModel.find({ _id: messageIds });
    };

    const handleError = () => {
      this.logger.debug('Ошибка получения сообщений');
    };

    return await this.transaction(execute, handleError);
  }
}
