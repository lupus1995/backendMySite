import { Test } from "@nestjs/testing";
import { SharpService } from "nestjs-sharp";
import * as fs from 'fs'
import { ImageService } from "./image.service"
import { ImageServiceTest } from "./image.test.sevice";

const rootSize = 'rootFolder/480/nameFile@480.png'
const rootPathWithFile = 'rootFolder/nameFile.png'
const issuePath = 'issuePath';
const codeImage = 'data:image/jpeg;base64,/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB';
const codeImagePng = 'data:image/png;base64,/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB';
const codeImageWithoutMimeType = '/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB';

jest.mock('fs', () => {
    return {
      __esModule: true,
      ...jest.requireActual('fs'),
      mkdirSync: jest.fn(),
      writeFileSync: jest.fn(),
      readFileSync: jest.fn().mockReturnThis(),
      toString: jest.fn((encoding) => {
        if (encoding === 'base64') {
            return codeImageWithoutMimeType;
        }
      })
    };
  });

jest
    .spyOn(fs, 'existsSync')
    .mockImplementation((path) => {
        if (path === issuePath || path === rootPathWithFile || path === rootSize) {
            return true;
        }

        return false;
    });

describe('ImageService', () => {
    let imageService: ImageServiceTest;

    const sharpServiceMock = jest.fn(() => ({
        edit: jest.fn().mockReturnThis(),
        resize: jest.fn().mockReturnThis(),
        jpeg: jest.fn().mockReturnThis(),
        png: jest.fn().mockReturnThis(),
        toFile: jest.fn().mockReturnThis(),
    }));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ImageService,
                {
                    provide: SharpService,
                    useFactory: sharpServiceMock,
                }
            ]
        }).compile();

        imageService = await module.get(ImageService);
    });

    afterEach(() => jest.clearAllMocks());

    it('check getImageWithoutMimeType', () => {
        const result = imageService.getImageWithoutMimeType('somename.png');

        expect(result).toBe('somename');
    });

    it('check getMimeTypeFromNameFile', () => {
        const result = imageService.getMimeTypeFromNameFile('somename.png');

        expect(result).toBe('png')
    });

    it('check checkedIsExistPath', () => {
        const resultIsTrue = imageService.checkedIsExistPath(issuePath);
        const resultIsFalse = imageService.checkedIsExistPath('some path to file');

        expect(resultIsTrue).toBeTruthy();
        expect(resultIsFalse).toBeFalsy();
    })

    it('check getImageType', () => {
        const result = imageService.getImageType(codeImage)
        
        expect(result).toBe('jpeg');
    });

    it('check saveImage', async () => {
        const result = await imageService.saveImage({
            codeImage,
            nameImage: 'nameImage',
            rootFolder: '/'
        });

        const resultPng = await imageService.saveImage({
            codeImage: codeImagePng,
            nameImage: 'nameImage',
            rootFolder: '/'
        });

        expect(result).toBe('nameImage.jpeg')
        expect(resultPng).toBe('nameImage.png')
    })

    it('check convetFileToBase64', () => {
        const result = imageService.convetFileToBase64({nameFile: 'nameFile.png', rootFolder: 'rootFolder'});
        const resultEmpty = imageService.convetFileToBase64({nameFile: 'nameFile1.png', rootFolder: 'rootFolder'});

        expect(result).toBe(codeImagePng);
        expect(resultEmpty).toBe('');
    });

    it('convertFilesToBase64ByName', () => {
        const arr = [
            {
              size: 480,
              file: 'data:image/png;base64,/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB'
            }
          ]
        const result = imageService.convertFilesToBase64ByName({nameFile: 'nameFile.png', rootFolder: 'rootFolder'});
        expect(JSON.stringify(result)).toBe(JSON.stringify(arr));
    })
})