import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { SignUpDto } from '../../auth/dto/sign-up.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import { TransAction } from './transaction';

@Injectable()
export class UserRepository extends TransAction {
  constructor(
    @InjectModel(User.name) protected model: Model<UserDocument>,
    @InjectConnection() protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(connection, logger);
  }

  public async findOne(username: string) {
    return await this.model.findOne({ username });
  }

  public async create(user: SignUpDto) {
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
