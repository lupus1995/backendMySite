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
    protected model: Model<RoomsDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  async createRoom({ interlocutors }: { interlocutors: string[] }) {
    const execute = async () => {
      return await this.model.create({ interlocutors });
    };

    const handleError = () => {
      this.logger.error('Не получилось создать комнату');
    };

    return await this.transaction(execute, handleError);
  }
}
