import { MainPageDocument } from './../schemas/mainPage.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MainPage } from '../schemas/mainPage.schema';
import { CreateMainPageDto } from './main-page.dto';

@Injectable()
export class MainPageService {
    constructor(
        @InjectModel(MainPage.name) private mainPageModel: Model<MainPageDocument>,
        @InjectConnection() private readonly connection: Connection,
        ) { }

    /**
     * Создание объекта, в котором будут хранится данные по главной странице
     */
    async create({ createMainPageDto }: { createMainPageDto: CreateMainPageDto }) {
        const session = await this.connection.startSession();
        session.startTransaction();
        
        try {
            const model = new this.mainPageModel(createMainPageDto);
            const savedModel = await model.save();
            await session.commitTransaction();
            return savedModel;
            
        } catch (e) {
            await session.abortTransaction();
            throw new HttpException('Ошибка удаления статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }
    }

    /**
     * Редактирование объекта, в котором будут хранится данные по главной странице 
     */
    async update({ createMainPageDto, id }: { createMainPageDto: CreateMainPageDto, id: string }) {
        const session = await this.connection.startSession();
        session.startTransaction();

        try {
            const model = await this.mainPageModel.updateOne({ id }, createMainPageDto)
           
            await session.commitTransaction();
            return model;
        } catch (e) {
            await session.abortTransaction();
            throw new HttpException('Ошибка удаления статьи', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }
    }

    /**
     * Получение объекта, в котором будут хранится данные по главной странице 
     */
    async get({ id }: { id: string }) {
        return await this.mainPageModel.findById(id);
    }
}
