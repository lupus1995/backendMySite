import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
    private readonly logger: Logger,
  ) {}

  public async findOne(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  public async create(user: SignUpDto) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const model = new this.userModel(user);

      await model.save();
      await session.commitTransaction();

      return model;
    } catch (error) {
      this.logger.error(error);
      await session.abortTransaction();
      throw new HttpException(
        'Ошибка регистрации пользователя',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }
}
