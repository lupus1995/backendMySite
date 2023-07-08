/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateMainPageDto } from '../../main-page/main-page.dto';
import { MainPage, MainPageDocument } from '../../schemas/mainPage.schema';
import { BaseRepository } from './base-repository';
import { HasFilterDto } from '../dto/has-filter.dto';
import { QueryPaginationDto } from '../dto/query-pagination.dto';
@Injectable()
export class MainPageRepository extends BaseRepository<MainPageDocument> {
  constructor(
    @InjectModel(MainPage.name) protected model: Model<MainPageDocument>,
    @InjectConnection() protected readonly connection: Connection,
    protected readonly logger: Logger,
  ) {
    super(model, connection, logger);
  }

  public async create({
    createMainPageDto,
  }: {
    createMainPageDto: CreateMainPageDto;
  }) {
    const execute = async () => {
      const newModel = new this.model(createMainPageDto);
      const savedModel = await newModel.save();
      return savedModel;
    };

    const handleError = () => {
      throw new HttpException('Ошибка создания статьи', HttpStatus.BAD_REQUEST);
    };

    return await this.transaction(execute, handleError);
  }

  public async update({ data, id }: { data: CreateMainPageDto; id: string }) {
    const execute = async () => {
      const model = await this.model.updateOne({ id }, data);
      return model;
    };

    const handleError = () => {
      throw new HttpException(
        'Ошибка редактирования данных',
        HttpStatus.BAD_REQUEST,
      );
    };

    return await this.transaction(execute, handleError);
  }

  public async findById() {
    return await this.model.findOne();
  }

  getAll({
    offset,
    limit,
    hasFilter,
  }: HasFilterDto & QueryPaginationDto): Promise<unknown[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | string[]): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}
