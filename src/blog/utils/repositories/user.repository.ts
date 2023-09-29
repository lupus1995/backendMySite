import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { TransAction } from '../../../utils/repositories/transaction';
import { MONGOOSE_LINK_NEST } from '../../../constants';
import { User, UserDocument } from '../../../utils/schemas/blog/user.schema';

@Injectable()
export class UserRepository extends TransAction {
  constructor(
    @InjectModel(User.name, MONGOOSE_LINK_NEST)
    protected model: Model<UserDocument>,
    @InjectConnection(MONGOOSE_LINK_NEST)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  public async findOne(username: string) {
    return await this.model.findOne({ username });
  }

  public async create(user: User) {
    const execute = async () => {
      const newUser = new this.model(user);

      await newUser.save();

      return newUser;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка регистрации пользователя',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }
}
