import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import * as fs from 'fs';
import isBase64 from 'is-base64';
import { sizes, sizes2x } from './constants';
import { createReadStream } from 'fs';

// вспомогательный модуль для сохранения и нарезки картинок в нужный размер, их выдачи на запрос
@Injectable()
export class ImageService {
  private supportImageMimes = ['jpeg', 'png'];
  constructor(
    protected sharpService: SharpService,
    protected readonly logger: Logger,
  ) {}

  protected createRootFolder(rootFolder: string) {
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder);
    }
  }

  protected isBase64(string64: string): boolean {
    return isBase64(string64, { allowMime: true });
  }

  // получение имени файла без его расширения
  protected getImageWithoutMimeType(nameFile: string): string {
    return nameFile.substring(0, nameFile.indexOf('.'));
  }

  // получение расширение файла из его названия
  protected getMimeTypeFromNameFile(nameFile: string): string {
    return nameFile.substring(nameFile.indexOf('.') + 1);
  }

  // проверяем существование папки или файла
  protected checkedIsExistPath(path: string): boolean {
    const isExistPath = fs.existsSync(path);
    if (!isExistPath) {
      this.logger.error(`Нет такого пути: ${path}`);
    }

    return isExistPath;
  }

  // получаем тип картинки из кода base64
  protected getImageMime({
    fromImage,
    image,
  }: {
    fromImage: 'path' | 'base64';
    image: string;
  }): string {
    switch (fromImage) {
      case 'path': {
        const imageMime = this.getMimeTypeFromNameFile(image);

        return imageMime;
      }

      case 'base64':
      default: {
        this.logger.debug(image);
        const imageMimeFromBase64 = image.substring(
          image.indexOf(':') + 1,
          image.indexOf(';'),
        );

        const imageMime = imageMimeFromBase64.substring(
          imageMimeFromBase64.indexOf('/') + 1,
        );

        return imageMime;
      }
    }
  }

  protected async cropImage({
    imageName,
    rootFolder,
    imageToPath,
  }: {
    imageName: string;
    rootFolder: string;
    imageToPath: string;
  }) {
    const imageMime = this.getImageMime({
      image: imageName,
      fromImage: 'path',
    });

    const imageWithoutMimeType = this.getImageWithoutMimeType(imageName);

    const arrSize = [...sizes, ...sizes2x];
    for (let i = 0; i <= arrSize.length - 1; i++) {
      if (!fs.existsSync(`${rootFolder}/${arrSize[i].size}`)) {
        fs.mkdirSync(`${rootFolder}/${arrSize[i].size}`);
      }

      switch (imageMime) {
        case 'jpeg': {
          await this.sharpService
            .edit(imageToPath)
            .resize(arrSize[i].size)
            .jpeg({ quality: 100, progressive: true })
            .toFile(
              `${rootFolder}/${arrSize[i].size}/${imageWithoutMimeType}@${arrSize[i].size}.${imageMime}`,
            );
          break;
        }

        case 'png': {
          await this.sharpService
            .edit(imageToPath)
            .resize(arrSize[i].size)
            .png({ quality: 100, progressive: true })
            .toFile(
              `${rootFolder}/${arrSize[i].size}/${imageWithoutMimeType}@${arrSize[i].size}.${imageMime}`,
            );
          break;
        }
      }
    }
  }

  // сохраняем и нарезаем картинку под необходимые размеры для кодированной картинки в формате base64
  // функция используется для сохранения картинок, которые приходят закодированные в base64 с ui
  async saveImageBase64({
    code,
    name,
    rootFolder,
  }: {
    code: string;
    name: string;
    rootFolder: string;
  }): Promise<string> {
    if (!this.isBase64(code)) {
      return code;
    }

    const base64Image = code.split(';base64,').pop();

    this.createRootFolder(rootFolder);

    const imageMime = this.getImageMime({ image: code, fromImage: 'base64' });

    this.logger.debug(imageMime);

    if (!this.supportImageMimes.includes(imageMime)) {
      throw new HttpException(
        `Изображение с расширение ${imageMime} не поддерживается!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const imageName = `${name}.${imageMime}`;
    const imageToPath = `${rootFolder}/${imageName}`;

    if (base64Image) {
      fs.writeFileSync(imageToPath, base64Image, { encoding: 'base64' });
    }

    this.cropImage({
      imageName,
      rootFolder,
      imageToPath,
    });

    return imageName;
  }

  saveImageFromPath({
    name,
    rootFolder,
  }: {
    name: string;
    rootFolder: string;
  }) {
    this.createRootFolder(rootFolder);
    const imageToPath = `${rootFolder}/${name}`;

    this.cropImage({
      imageName: name,
      rootFolder,
      imageToPath,
    });
  }

  // удаление файлов после удаления статьи
  deletedFiles({
    nameImage,
    rootFolder,
    isDeleteOriginFile = true,
  }: {
    nameImage: string;
    rootFolder: string;
    isDeleteOriginFile?: boolean;
  }): void {
    const imagePath = `${rootFolder}/${nameImage}`;
    const mimeType = this.getMimeTypeFromNameFile(nameImage);

    if (this.checkedIsExistPath(imagePath) && isDeleteOriginFile) {
      fs.unlinkSync(imagePath);
    }

    const nameImageWithoutMime = this.getImageWithoutMimeType(nameImage);
    const arrSize = [...sizes, ...sizes2x];

    arrSize.forEach((item) => {
      const path = `${rootFolder}/${item.size}/${nameImageWithoutMime}@${item.size}.${mimeType}`;
      if (this.checkedIsExistPath(path)) {
        fs.unlinkSync(path);
      }
    });
  }

  // генерация картинок по ссылке
  // используется для социальных сетей вк и телеграм
  // на данный момент для вк используется ширина 1280, для телеграмма - 510
  getFile({
    nameImage,
    rootFolder,
    size,
  }: {
    nameImage: string;
    rootFolder: string;
    size: string;
  }): StreamableFile {
    const nameImageWithoutMime = this.getImageWithoutMimeType(nameImage);
    const mimeType = this.getMimeTypeFromNameFile(nameImage);
    const imagePath = `${rootFolder}/${size}/${nameImageWithoutMime}@${size}.${mimeType}`;
    if (this.checkedIsExistPath(imagePath)) {
      const file = createReadStream(imagePath);

      return new StreamableFile(file);
    }

    throw new HttpException(
      'Такого файла не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
