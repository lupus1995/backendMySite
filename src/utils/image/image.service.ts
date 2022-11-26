import { Injectable } from "@nestjs/common";
import { SharpService } from "nestjs-sharp";
import * as fs from 'fs'
import { sizes, sizes2x } from './constants';

// вспомогательный модуль для сохранения и нарезки картинок в нужный размер
@Injectable()
export class ImageService {
    constructor(private sharpService: SharpService) { }

    // сохраняем и нарезаем картинку под необходимые размеры
    async saveImage({ codeImage, nameImage, rootFolder }: { codeImage: string; nameImage: string, rootFolder: string }): Promise<string> {
        let base64Image = codeImage.split(';base64,').pop();

        if (!fs.existsSync(rootFolder)) {
            fs.mkdirSync(rootFolder);
        }

        const imageMime = codeImage.substring(codeImage.indexOf(":") + 1, codeImage.indexOf(";"))

        const imageType = imageMime.substring(imageMime.indexOf('/') + 1)

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
                        .toFile(`${rootFolder}/${arrSize[i].size}/${nameImage}@${arrSize[i].size}.${imageType}`);
                    break;
                }

                case 'png': {
                    await this.sharpService
                        .edit(imagePath)
                        .resize(arrSize[i].size)
                        .png({ quality: 100, progressive: true })
                        .toFile(`${rootFolder}/${arrSize[i].size}/${nameImage}@${arrSize[i].size}.${imageType}`);
                    break;
                }
            }


        }

        return imageName;
    }

    // конвертируем файл в base64
    convetFileToBase64({nameFile}:{nameFile: string}): string {
        const mimeType = nameFile.substring(nameFile.indexOf('.')+1)
        return `data:image/${mimeType};base64,` + fs.readFileSync(`./images/${nameFile}`).toString('base64');
    }
}