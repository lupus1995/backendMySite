import { MainPageDocument } from './../schemas/mainPage.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainPage } from 'src/schemas/mainPage.schema';
import { CreateMainPageDto } from './main-page.dto';

@Injectable()
export class MainPageService {
    constructor(@InjectModel(MainPage.name) private mainPageModel: Model<MainPageDocument>) { }

    /**
     * Создание объекта, в котором будут хранится данные по главной странице
     */
    async create({ createMainPageDto }: { createMainPageDto: CreateMainPageDto }) {
        const model = new this.mainPageModel(createMainPageDto);
        return model.save();
    }

    /**
     * Редактирование объекта, в котором будут хранится данные по главной странице 
     */
    async update({ createMainPageDto, id }: { createMainPageDto: CreateMainPageDto, id: string }) {
        return await this.mainPageModel.updateOne({ id }, createMainPageDto)
    }

    /**
     * Получение объекта, в котором будут хранится данные по главной странице 
     */
    async get({ id }: { id: string }) {
        return await this.mainPageModel.findById(id);
    }
}
