import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { MONGOOSE_LINK_SOCKETS } from '../../../constants';
import { BaseRepository } from '../../../utils/repositories/base-repository';
import { HasFilterDto } from 'src/utils/dto/has-filter.dto';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) protected model: Model<UserDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(model, connection, logger);
  }

  // поиск пользователя по id
  async findById(id: string): Promise<UserDocument> {
    return await this.model.findById(id);
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
  // получения списка пользователей
  async getAll({
    offset,
    limit,
    hasFilter = true,
  }: HasFilterDto & QueryPaginationDto) {
    // TODO настроить фильтр после описания требований
    if (hasFilter) {
      const users = await this.model.find().skip(offset).limit(limit);

      return users;
    }
  }

  // обновление пользователя
  async update({ id, data }: { id: string; data: User }) {
    const execute = async () => {
      const model = await this.model.updateOne({ _id: id }, data);

      return model;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка редактирования пользователя',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }

  // удаление пользователя
  async delete(id: string) {
    const execute = async () => {
      const user = await this.model.deleteOne({ _id: id });
      return user;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка удаления сообщений с обратной связью',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }
}
