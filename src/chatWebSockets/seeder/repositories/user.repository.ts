import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

import { TransAction } from '@utils/repositories/transaction';
import {
  User,
  UserDocument,
  UserType,
} from '@utils/schemas/web-sockets/user.schema';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';

import { UserInterface } from '../interfaces';

@Injectable()
export class UserRepository extends TransAction {
  constructor(
    @InjectModel(User.name, MONGOOSE_LINK_SOCKETS)
    protected model: Model<UserDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  async create(data: UserInterface[]) {
    const execute = async (): Promise<UserType[]> => {
      const newUsers = data.map((item) => new this.model(item));
      const models = await this.model.create(newUsers);
      return models;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка редактирования пользователя',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }
}
