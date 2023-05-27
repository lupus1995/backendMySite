import { Logger } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { HasFilterDto } from '../dto/has-filter.dto';
import { QueryPaginationDto } from '../dto/query-pagination.dto';

export abstract class BaseRepository<T> {
  constructor(
    private model: Model<T>,
    private connection: Connection,
    private logger: Logger,
  ) {}

  // поиск по заданому параметру, сам параметр в зависимости от модели может отличаться
  abstract findOne(query: string): Promise<unknown>;

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

  abstract delete(id: string): Promise<unknown>;
}
