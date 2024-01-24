import * as fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArticleImageService {
  rootPath = './articles';
  constructor(
    protected sharpService: SharpService,
    protected readonly logger: Logger,
  ) {}

  // получение расширение файла из его названия
  protected getMimeTypeFromNameFile(nameFile: string): string {
    return nameFile.substring(nameFile.indexOf('.') + 1);
  }

  // загрузка картинки для статьи
  async uploadImage({ image, id }: { image: Express.Multer.File; id: string }) {
    if (!fs.existsSync(this.rootPath)) {
      fs.mkdirSync(this.rootPath);
    }

    const imageToPath = `${this.rootPath}/${id}`;

    if (!fs.existsSync(imageToPath)) {
      fs.mkdirSync(imageToPath);
    }

    const extenstion = this.getMimeTypeFromNameFile(image.originalname);

    const newNameImage = uuid();

    switch (extenstion) {
      case 'jpeg': {
        await this.sharpService
          .edit(image.buffer)
          .jpeg({ quality: 100, progressive: true })
          .toFile(`${imageToPath}/${newNameImage}.${extenstion}`);

        return `${imageToPath}/${newNameImage}.${extenstion}`;
      }

      case 'png': {
        await this.sharpService
          .edit(image.buffer)
          .png({ quality: 100, progressive: true })
          .toFile(`${imageToPath}/${newNameImage}.${extenstion}`);
        return `${imageToPath}/${newNameImage}.${extenstion}`;
      }

      default: {
        const message = 'Загружено тип изображения, которое не поддерживается.';
        this.logger.error(message);

        throw new Error(message);
      }
    }
  }

  deleteForlderWithImage({ id }: { id: string }) {
    const imageToPath = `${this.rootPath}/${id}`;

    if (fs.existsSync(imageToPath)) {
      fs.unlinkSync(imageToPath);
    }
  }
}
