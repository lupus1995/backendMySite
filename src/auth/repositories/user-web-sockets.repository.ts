import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { User, UserDocument } from 'src/utils/schemas/web-sockets/user.schema';

import { MONGOOSE_LINK_SOCKETS } from '../../constants';
import { TransAction } from '../../utils/repositories/transaction';

@Injectable()
export class UserWebSocketsRepository extends TransAction {
  constructor(
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    @InjectModel(User.name, MONGOOSE_LINK_SOCKETS)
    protected model: Model<UserDocument>,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  // создание пользователя
  async create(user: User) {
    const execute = async () => {
      const model = new this.model(user);

      const savedModel = await model.save();

      return savedModel;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка создания пользователя чата',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }

  // поиск пользователя по полю username
  async findByUsername({ username }: { username: string }) {
    return await this.model.findOne({ username });
  }

  // поиск пользователя по email
  async findByEmail({ email }: { email: string }) {
    return await this.model.findOne({ email });
  }
}
