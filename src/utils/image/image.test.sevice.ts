import { Injectable } from "@nestjs/common";
import { ImageService } from "./image.service";

@Injectable()
export class ImageServiceTest extends ImageService {
    public getImageWithoutMimeType(nameFile: string): string {
        return super.getImageWithoutMimeType(nameFile);
    }

    // получение расширение файла из его названия
    public getMimeTypeFromNameFile(nameFile: string): string {
        return super.getMimeTypeFromNameFile(nameFile);
    }

    // проверяем существование папки или файла
    public checkedIsExistPath (path: string): boolean {
        return super.checkedIsExistPath(path);
    }
}