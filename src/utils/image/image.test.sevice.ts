import { Injectable } from '@nestjs/common';
import { ImageService } from './image.service';

@Injectable()
export class ImageServiceTest extends ImageService {
  public createRootFolder(rootFolder: string) {
    super.createRootFolder(rootFolder);
  }

  public isBase64(string64: string): boolean {
    return super.isBase64(string64);
  }

  public getImageWithoutMimeType(nameFile: string): string {
    return super.getImageWithoutMimeType(nameFile);
  }

  // получение расширение файла из его названия
  public getMimeTypeFromNameFile(nameFile: string): string {
    return super.getMimeTypeFromNameFile(nameFile);
  }

  // проверяем существование папки или файла
  public checkedIsExistPath(path: string): boolean {
    return super.checkedIsExistPath(path);
  }

  public getImageMime({
    fromImage,
    image,
  }: {
    fromImage: 'path' | 'base64';
    image: string;
  }): string {
    return super.getImageMime({ fromImage, image });
  }

  public async cropImage({
    imageName,
    rootFolder,
    imageToPath,
  }: {
    imageName: string;
    rootFolder: string;
    imageToPath: string;
  }) {
    super.cropImage({
      imageName,
      rootFolder,
      imageToPath,
    });
  }
}
