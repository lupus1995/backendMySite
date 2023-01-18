import { Injectable, Logger } from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import * as fs from 'fs';
import { sizes, sizes2x } from './constants';

// вспомогательный модуль для сохранения и нарезки картинок в нужный размер, их выдачи на запрос
@Injectable()
export class ImageService {
  protected readonly logger: Logger;
  constructor(protected sharpService: SharpService) {
    this.logger = new Logger();
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
  getImageType(codeImage: string): string {
    const imageMime = codeImage.substring(
      codeImage.indexOf(':') + 1,
      codeImage.indexOf(';'),
    );

    const imageType = imageMime.substring(imageMime.indexOf('/') + 1);

    return imageType;
  }

  // сохраняем и нарезаем картинку под необходимые размеры
  async saveImage({
    codeImage,
    nameImage,
    rootFolder,
  }: {
    codeImage: string;
    nameImage: string;
    rootFolder: string;
  }): Promise<string> {
    const base64Image = codeImage.split(';base64,').pop();

    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder);
    }

    const imageType = this.getImageType(codeImage);

    const imageName = `${nameImage}.${imageType}`;
    const imagePath = `${rootFolder}/${imageName}`;

    if (base64Image) {
      fs.writeFileSync(imagePath, base64Image, { encoding: 'base64' });
    }

    const arrSize = [...sizes, ...sizes2x];

    for (let i = 0; i <= arrSize.length - 1; i++) {
      if (!fs.existsSync(`${rootFolder}/${arrSize[i].size}`)) {
        fs.mkdirSync(`${rootFolder}/${arrSize[i].size}`);
      }

      switch (imageType) {
        case 'jpeg': {
          await this.sharpService
            .edit(imagePath)
            .resize(arrSize[i].size)
            .jpeg({ quality: 100, progressive: true })
            .toFile(
              `${rootFolder}/${arrSize[i].size}/${nameImage}@${arrSize[i].size}.${imageType}`,
            );
          break;
        }

        case 'png': {
          await this.sharpService
            .edit(imagePath)
            .resize(arrSize[i].size)
            .png({ quality: 100, progressive: true })
            .toFile(
              `${rootFolder}/${arrSize[i].size}/${nameImage}@${arrSize[i].size}.${imageType}`,
            );
          break;
        }
      }
    }

    return imageName;
  }

  // конвертируем файл в base64
  convetFileToBase64({
    nameFile,
    rootFolder,
  }: {
    nameFile: string;
    rootFolder: string;
  }): string {
    const mimeType = this.getMimeTypeFromNameFile(nameFile);
    const path = `${rootFolder}/${nameFile}`;
    if (this.checkedIsExistPath(path)) {
      return (
        `data:image/${mimeType};base64,` +
        fs.readFileSync(path).toString('base64')
      );
    } else {
      return '';
    }
  }

  // конвертируем файлы в base64
  convertFilesToBase64ByName({
    nameFile,
    rootFolder,
  }: {
    nameFile: string;
    rootFolder: string;
  }): {
    size: number;
    file: string;
  }[] {
    const nameImageWithoutMime = this.getImageWithoutMimeType(nameFile);
    const mimeType = this.getMimeTypeFromNameFile(nameFile);

    const arrSize = [...sizes, ...sizes2x];

    const result = arrSize
      .filter((item) => {
        const path = `${rootFolder}/${item.size}/${nameImageWithoutMime}@${item.size}.${mimeType}`;

        return this.checkedIsExistPath(path);
      })
      .map((item) => {
        return {
          size: item.size,
          file:
            `data:image/${mimeType};base64,` +
            fs
              .readFileSync(
                `${rootFolder}/${item.size}/${nameImageWithoutMime}@${item.size}.${mimeType}`,
              )
              .toString('base64'),
        };
      });

    return result;
  }

  // удаление файлов после удаления статьи
  deletedFiles({
    nameImage,
    rootFolder,
  }: {
    nameImage: string;
    rootFolder: string;
  }): void {
    const imagePath = `${rootFolder}/${nameImage}`;
    const mimeType = this.getMimeTypeFromNameFile(nameImage);

    if (this.checkedIsExistPath(imagePath)) {
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
}
