import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MONGOOSE_LINK_SOCKETS } from '../../../constants';
import { BaseRepository } from '../../../utils/repositories/base-repository';
import { HasFilterDto } from 'src/utils/dto/has-filter.dto';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { User, UserDocument } from 'src/utils/schemas/web-sockets/user.schema';
import { UserInterface, UserType } from '../interfaces';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name, MONGOOSE_LINK_SOCKETS)
    protected model: Model<UserDocument>,
    @InjectConnection(MONGOOSE_LINK_SOCKETS)
    protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(model, connection, logger);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // поиск пользователя по id
  async findById(id: string): Promise<UserDocument> {
    return await this.model.findById(id);
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
