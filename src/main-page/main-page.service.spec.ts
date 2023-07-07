import { Test } from '@nestjs/testing';
import { ImageService } from '../utils/image/image.service';
import { MainPageService } from './main-page.service';
import { mainPageCreateData } from './mockData';
import { MainPageRepository } from '../utils/repositories/main-page.repository';
import { Logger } from '@nestjs/common';

describe('main page service', () => {
  let mainPageService: MainPageService;

  const mainPageRepositoryMock = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(mainPageCreateData),
    get: jest.fn().mockResolvedValue({
      ...mainPageCreateData,
      aboutMePhoto: 'convetFileToBase64',
      firstBlockBackgroundImage: 'convetFileToBase64',
      _id: 'id',
    }),
    update: jest.fn().mockReturnValue({
      ...mainPageCreateData,
      _id: 'id',
    }),
    findById: jest.fn().mockReturnValue('findById'),
  });

  const loggerMock = jest.fn().mockReturnValue({
    error: jest.fn(),
  });

  const imageServiceMock = jest.fn().mockReturnValue({
    saveImage: jest.fn().mockReturnValue('save image'),
    saveImageBase64: jest.fn().mockReturnValue('saveImageBase64'),
    convetFileToBase64: jest.fn().mockReturnValue('convetFileToBase64'),
    convertFilesToBase64ByName: jest
      .fn()
      .mockReturnValue('convertFilesToBase64ByName'),
    getFile: jest.fn().mockReturnValue('getFile'),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MainPageService,
        {
          provide: ImageService,
          useFactory: imageServiceMock,
        },
        {
          provide: Logger,
          useValue: loggerMock,
        },
        {
          provide: MainPageRepository,
          useFactory: mainPageRepositoryMock,
        },
      ],
    }).compile();

    mainPageService = await module.get(MainPageService);
  });

  afterEach(() => jest.clearAllMocks());

  it('create', async () => {
    const result = await mainPageService.create({
      createMainPageDto: mainPageCreateData,
    });

    expect(result).toStrictEqual(mainPageCreateData);
  });

  it('update', async () => {
    const result = await mainPageService.update({
      createMainPageDto: mainPageCreateData,
      id: 'id',
    });

    expect(result).toStrictEqual({ ...mainPageCreateData, _id: 'id' });
  });

  it('get page', async () => {
    const result = await mainPageService.get();

    expect(result).toStrictEqual('findById');
  });

  it('getImage', () => {
    const result = mainPageService.getImage({ nameImage: 'name', size: '510' });

    expect(result).toBe('getFile');
  });
});
