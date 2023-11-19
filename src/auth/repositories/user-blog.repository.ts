import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { TransAction } from 'utils/repositories/transaction';
import { User, UserDocument } from 'utils/schemas/blog/user.schema';

import { MONGOOSE_LINK_NEST } from '../../constants';
import { SignUpBlogInterface } from '../dto/sign-up-blog.dto';

@Injectable()
export class UserBlogRepository extends TransAction {
  constructor(
    @InjectModel(User.name, MONGOOSE_LINK_NEST)
    protected model: Model<UserDocument>,
    @InjectConnection(MONGOOSE_LINK_NEST)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  // поиск пользователя по полю username
  async findOne(username: string): Promise<UserDocument> {
    return await this.model.findOne({ username });
  }

  // создание пользователя
  public async create(user: SignUpBlogInterface) {
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
