import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MainPage, MainPageDocument } from '../schemas/mainPage.schema';
import { CreateMainPageDto } from './main-page.dto';
@Injectable()
export class MainPageRepository {
  private readonly logger: Logger;
  constructor(
    @InjectModel(MainPage.name) private mainPageModel: Model<MainPageDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.logger = new Logger();
  }

  public async create({
    createMainPageDto,
  }: {
    createMainPageDto: CreateMainPageDto;
  }) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = new this.mainPageModel(createMainPageDto);
      const savedModel = await model.save();
      await session.commitTransaction();
      return savedModel;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException('Ошибка создания статьи', HttpStatus.BAD_REQUEST);
    } finally {
      session.endSession();
    }
  }

  public async update({
    createMainPageDto,
    id,
  }: {
    createMainPageDto: CreateMainPageDto;
    id: string;
  }) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const model = await this.mainPageModel.updateOne(
        { id },
        createMainPageDto,
      );

      await session.commitTransaction();
      return model;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
      throw new HttpException(
        'Ошибка редактирования данных',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      session.endSession();
    }
  }

  public async get() {
    return await this.mainPageModel.findOne().exec();
  }
}
