import { TransAction } from '../../../utils/repositories/transaction';
import { User, UserDocument } from '../user.schema';
import { MONGOOSE_LINK_SOCKETS } from '../../../constants';
import { Connection, Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

// репозиторий для работы с валидаторами в дто
@Injectable()
export class UserRuleRepository extends TransAction {
  constructor(
    @InjectModel(User.name, MONGOOSE_LINK_SOCKETS)
    protected user: Model<UserDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS) protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  // поиск пользователя по email
  async findByEmail({ email }: { email: string }) {
    return await this.user.find({ email });
  }

  // поиск пользователя по username
  async findByUsername({ username }: { username: string }) {
    return await this.user.find({ username });
  }
}
