import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { CreateMainPageDto } from './main-page.dto';
import { ImageService } from '../utils/image/image.service';
import { MainPageRepository } from './main-page.repository';

@Injectable()
export class MainPageService {
  private readonly logger: Logger;
  private rootFolder = './images';
  constructor(
    private imageService: ImageService,
    private readonly mainPageRepository: MainPageRepository,
  ) {
    this.logger = new Logger();
  }

  /**
   * Создание объекта, в котором будут хранится данные по главной странице
   */
  async create({
    createMainPageDto,
  }: {
    createMainPageDto: CreateMainPageDto;
  }) {
    const model = { ...createMainPageDto };

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

    return await this.mainPageRepository.create({ createMainPageDto: model });
  }

  /**
   * Редактирование объекта, в котором будут хранится данные по главной странице
   */
  public async update({
    createMainPageDto,
    id,
  }: {
    createMainPageDto: CreateMainPageDto;
    id: string;
  }) {
    const data = { ...createMainPageDto };
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

    return await this.mainPageRepository.update({
      createMainPageDto: data,
      id,
    });
  }

  /**
   * Получение объекта, в котором будут хранится данные по главной странице
   */
  async get() {
    try {
      const result = await this.mainPageRepository.get();
      result.firstBlockBackgroundImage = this.imageService.convetFileToBase64({
        nameFile: result.firstBlockBackgroundImage,
        rootFolder: this.rootFolder,
      });
      result.aboutMePhoto = this.imageService.convetFileToBase64({
        nameFile: result.aboutMePhoto,
        rootFolder: this.rootFolder,
      });
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Ошибка получения статьи',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * получить имена картинок
   */
  async getImageName() {
    try {
      const result = await this.mainPageRepository.get();
      const { firstBlockBackgroundImage, aboutMePhoto } = result;
      return { firstBlockBackgroundImage, aboutMePhoto };
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Ошибка получения данных',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * получить конвертированные картинки на сторону фронта
   */
  getImages({ imageName }: { imageName: string }) {
    return this.imageService.convertFilesToBase64ByName({
      nameFile: imageName,
      rootFolder: this.rootFolder,
    });
  }

  getImage({
    nameImage,
    size,
  }: {
    nameImage: string;
    size: string;
  }): StreamableFile {
    return this.imageService.getFile({
      nameImage,
      size,
      rootFolder: this.rootFolder,
    });
  }
}
