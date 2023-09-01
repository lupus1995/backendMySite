import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { HasFilterDto } from '../../utils/dto/has-filter.dto';
import { QueryPaginationDto } from '../../utils/dto/query-pagination.dto';
import { TransAction } from './transaction';

export abstract class BaseRepository<T> extends TransAction {
  constructor(
    protected model: Model<T>,
    protected connection: Connection,
    protected logger: Logger,
  ) {
    super(connection, logger);
  }

  // поиск по заданому параметру, сам параметр в зависимости от модели может отличаться
  // abstract findOne(query: string): Promise<unknown>;

  // поиск по id
  abstract findById(id: string): Promise<unknown>;

  // добавление нового объекта в базу данных
  abstract create(data: unknown): Promise<unknown>;

  // получение всех данных, участвует в пагинации
  abstract getAll({
    offset,
    limit,
    hasFilter,
  }: HasFilterDto & QueryPaginationDto): Promise<unknown[]>;

  // обновление данных в базе данных
  abstract update({
    id,
    data,
  }: {
    id: string;
    data: unknown;
  }): Promise<unknown>;

  abstract delete(id: string | string[]): Promise<unknown>;
}
