import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { TransAction } from 'src/utils/repositories/transaction';
import {
  Rooms,
  RoomsDocument,
} from 'src/utils/schemas/web-sockets/rooms.schema';

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
}
