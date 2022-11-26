import { MainPageDocument } from './../schemas/mainPage.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MainPage } from '../schemas/mainPage.schema';
import { CreateMainPageDto } from './main-page.dto';
import { ImageService } from 'src/utils/image/image.service';

@Injectable()
export class MainPageService {
    private rootFolder: string = './images';
    constructor(
        @InjectModel(MainPage.name) private mainPageModel: Model<MainPageDocument>,
        @InjectConnection() private readonly connection: Connection,
        private imageService: ImageService,
    ) { }

    /**
     * Создание объекта, в котором будут хранится данные по главной странице
     */
    async create({ createMainPageDto }: { createMainPageDto: CreateMainPageDto }) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const model = new this.mainPageModel(createMainPageDto);

            model.firstBlockBackgroundImage = await this.imageService.saveImage({
                codeImage: model.firstBlockBackgroundImage,
                nameImage: 'firstBlockBackgroundImage',
                rootFolder: this.rootFolder,
            });
            model.aboutMePhoto = await this.imageService.saveImage({
                codeImage: model.aboutMePhoto,
                nameImage: 'aboutMePhoto',
                rootFolder: this.rootFolder,
            });
            const savedModel = await model.save();
            await session.commitTransaction();
            return savedModel;

        } catch (e) {
            console.log('e', e)
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
            const data = { ...createMainPageDto }
            data.firstBlockBackgroundImage = await this.imageService.saveImage({
                codeImage: data.firstBlockBackgroundImage,
                nameImage: 'firstBlockBackgroundImage',
                rootFolder: this.rootFolder,
            });
            data.aboutMePhoto = await this.imageService.saveImage({
                codeImage: data.aboutMePhoto,
                nameImage: 'aboutMePhoto',
                rootFolder: this.rootFolder,
            });
            const model = await this.mainPageModel.updateOne({ id }, data)

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
    async get() {
        try {
            const result = await this.mainPageModel.findOne().exec();
            result.firstBlockBackgroundImage = this.imageService.convetFileToBase64({nameFile: result.firstBlockBackgroundImage});
            result.aboutMePhoto = this.imageService.convetFileToBase64({nameFile: result.aboutMePhoto});
            return result;
        } catch (e) {
            throw new HttpException('Ошибка получения статьи', HttpStatus.BAD_REQUEST);
        }
        
    }
}
