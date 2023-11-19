import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { TransAction } from 'utils/repositories/transaction';
import {
  Message,
  MessageDocument,
} from 'utils/schemas/web-sockets/message.schema';

import { MessageInterface } from '../interfaces';

@Injectable()
export class MessageRepository extends TransAction {
  constructor(
    @InjectModel(Message.name, MONGOOSE_LINK_SOCKETS)
    protected model: Model<MessageDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  async create(messages: MessageInterface[]) {
    const execute = async () => {
      const newModels = messages.map((message) => new this.model(message));

      return await this.model.create(newModels);
    };

    const handleError = () => {
      this.logger.error('Ошибка создания сообщения');
    };

    return this.transaction(execute, handleError);
  }
}
