import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { TransAction } from 'src/utils/repositories/transaction';
import {
  Interlocutors,
  InterlocutorsDocument,
} from 'src/utils/schemas/web-sockets/interlocutors.schema';
import { InterlocutorsInterface } from '../interfaces';
import { MessageType } from 'src/utils/schemas/web-sockets/message.schema';

@Injectable()
export class InterlocutorsRepository extends TransAction {
  constructor(
    @InjectModel(Interlocutors.name, MONGOOSE_LINK_SOCKETS)
    protected model: Model<InterlocutorsDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  async addInterlocutors(userIds: string[]) {
    const execute = async () => {
      this.logger.log('Заносим созданых пользователей в схему собеседников');
      const interlocutors = userIds.map((userId) => {
        const interlocutor: InterlocutorsInterface = {
          userId,
          interlocutors: [],
        };

        return interlocutor;
      });
      await this.model.create(interlocutors);
      this.logger.log('Занесли созданых пользователей в схему собеседников');
    };

    const handleError = () => {
      this.logger.error(
        'Во время занесения созданных пользователей в схему собеседников произошла ошибка',
      );
    };

    await this.transaction(execute, handleError);
  }

  async updateInterlocutors({
    userId,
    interlocutorId,
    message,
  }: {
    userId: string;
    interlocutorId: string;
    message: MessageType;
  }) {
    this.logger.log('Находим пользователя по его id');
    const data = await this.model.findOne({ userId });
    this.logger.log('Обновляем данные о собеседниках пользователя');
    const updatedIndex = data.interlocutors.findIndex(
      (item) => item.interlocutorId === interlocutorId,
    );

    if (updatedIndex !== -1) {
      data.interlocutors[updatedIndex] = {
        ...data.interlocutors[updatedIndex],
        messageId: message._id,
        createdAt: message.createdAt,
      };
    } else {
      data.interlocutors = [
        ...data.interlocutors,
        {
          interlocutorId,
          messageId: message._id,
          createdAt: message.createdAt,
        },
      ];
    }

    this.logger.log('Сохраняем обновленные данные о собеседниках пользователя');
    await this.model.updateOne({ _id: data._id }, data);
  }
}
