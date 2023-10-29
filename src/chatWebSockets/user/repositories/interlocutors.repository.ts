import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { TransAction } from 'src/utils/repositories/transaction';
import {
  Interlocutors,
  InterlocutorsDocument,
} from 'src/utils/schemas/web-sockets/interlocutors.schema';

@Injectable()
export class InterlocutorsRepository extends TransAction {
  constructor(
    @InjectModel(Interlocutors.name, MONGOOSE_LINK_SOCKETS)
    protected interlocutorsModel: Model<InterlocutorsDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS) protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  async getAllInterlocutors({ userId }: { userId: string }) {
    const interlocutor = await this.interlocutorsModel.findOne({ userId });

    return interlocutor;
  }
}
