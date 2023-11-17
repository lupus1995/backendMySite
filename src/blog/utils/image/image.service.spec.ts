import * as fs from 'fs';

import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SharpService } from 'nestjs-sharp';

import { ImageService } from './image.service';
import { ImageServiceTest } from './image.test.sevice';

const rootSize = 'rootFolder/480/nameFile@480.png';
const rootPathWithFile = 'rootFolder/nameFile.png';
const issuePath = 'issuePath';
const codeImage =
  'data:image/jpeg;base64,/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB';
const codeImageWithoutMimeType =
  '/9j/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB';

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
    }),
  };
});

jest.spyOn(fs, 'existsSync').mockImplementation((path) => {
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

  const logger = jest.fn().mockReturnValue({
    error: jest.fn(),
    debug: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: SharpService,
          useFactory: sharpServiceMock,
        },
        {
          provide: Logger,
          useFactory: logger,
        },
      ],
    }).compile();

    imageService = await module.get(ImageService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be createRootFolder', () => {
    expect(imageService.createRootFolder).toBeDefined();
  });

  it('check isBase64, is true', () => {
    expect(imageService.isBase64(codeImage)).toBeTruthy();
  });

  it('check isBase64, is false', () => {
    expect(imageService.isBase64('111 333')).toBeFalsy();
  });

  it('getImageWithoutMimeType is correct argument', () => {
    expect(imageService.getImageWithoutMimeType('test.png')).toBe('test');
  });

  it('getImageWithoutMimeType is not correct argument', () => {
    expect(imageService.getImageWithoutMimeType('test')).toBe('');
  });

  it('check getMimeTypeFromNameFile', () => {
    expect(imageService.getMimeTypeFromNameFile('test.png')).toBe('png');
  });

  it('check getMimeTypeFromNameFile is not correct', () => {
    expect(imageService.getMimeTypeFromNameFile('test')).toBe('test');
  });

  it('checkedIsExistPath is issue path', () => {
    expect(imageService.checkedIsExistPath(rootSize)).toBeTruthy();
  });

  it('checkedIsExistPath is not issue path', () => {
    expect(imageService.checkedIsExistPath('/response')).toBeFalsy();
  });

  it('getImageMime from base64', () => {
    expect(
      imageService.getImageMime({ fromImage: 'base64', image: codeImage }),
    ).toBe('jpeg');
  });

  it('getImageMime from image', () => {
    expect(
      imageService.getImageMime({ fromImage: 'path', image: 'test.png' }),
    ).toBe('png');
  });

  it('cropImage', () => {
    expect(imageService.cropImage).toBeDefined();
  });

  it('saveImageBase64', () => {
    expect(imageService.saveImageBase64).toBeDefined();
  });

  it('saveImageFromPath', () => {
    expect(imageService.saveImageFromPath).toBeDefined();
  });

  it('deletedFiles', () => {
    expect(imageService.deletedFiles).toBeDefined();
  });

  it('getFile', () => {
    expect(imageService.getFile).toBeDefined();
  });
});
