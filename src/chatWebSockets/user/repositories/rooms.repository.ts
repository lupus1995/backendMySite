import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { TransAction } from '@utils/repositories/transaction';
import { Rooms, RoomsDocument } from '@utils/schemas/web-sockets/rooms.schema';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';

@Injectable()
export class RoomsRepository extends TransAction {
  constructor(
    @InjectModel(Rooms.name, MONGOOSE_LINK_SOCKETS)
    protected roomsModel: Model<RoomsDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS) protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  async getRoomsByInterlocutor({ userId }: { userId: string }) {
    const execute = async () => {
      return await this.roomsModel.find({ interlocutors: userId });
    };

    const handleError = () => {
      this.logger.error('Ошибка в поиске комнаты');
    };

    return this.transaction(execute, handleError);
  }

  // поиск комнаты по id
  async getRoomById({ roomId }: { roomId: string }) {
    const execute = async () => {
      return await this.roomsModel.findById(roomId);
    };

    const handleError = () => {
      this.logger.error('Ошибка в поиске комнаты');
    };

    return this.transaction(execute, handleError);
  }
}
