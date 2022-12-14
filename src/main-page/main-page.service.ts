import { MainPageDocument } from './../schemas/mainPage.schema';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MainPage } from '../schemas/mainPage.schema';
import { CreateMainPageDto } from './main-page.dto';
import { ImageService } from 'src/utils/image/image.service';

@Injectable()
export class MainPageService {
    private readonly logger: Logger;
    private rootFolder: string = './images';
    constructor(
        @InjectModel(MainPage.name) private mainPageModel: Model<MainPageDocument>,
        @InjectConnection() private readonly connection: Connection,
        private imageService: ImageService,
    ) {
        this.logger = new Logger();
    }

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
            this.logger.error(e);
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
            this.logger.error(e);
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
            result.firstBlockBackgroundImage = this.imageService.convetFileToBase64({ nameFile: result.firstBlockBackgroundImage, rootFolder: this.rootFolder, });
            result.aboutMePhoto = this.imageService.convetFileToBase64({ nameFile: result.aboutMePhoto, rootFolder: this.rootFolder, });
            return result;
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Ошибка получения статьи', HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * получить имена картинок
     */
    async getImageName() {
        try {
            const result = await this.mainPageModel.findOne().exec();
            const { firstBlockBackgroundImage, aboutMePhoto } = result;
            return { firstBlockBackgroundImage, aboutMePhoto };
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Ошибка получения данных', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * получить конвертированные картинки на сторону фронта
     */
    getImages({ imageName }: { imageName: string }) {
        return this.imageService.convertFilesToBase64ByName({ nameFile: imageName, rootFolder: this.rootFolder })
    }
}
