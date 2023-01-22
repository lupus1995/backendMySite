import { Test } from '@nestjs/testing';
import { ImageService } from '../utils/image/image.service';
import { MainPageRepository } from './main-page.repository';
import { MainPageService } from './main-page.service';
import { mainPageCreateData } from './mockData';

describe('main page service', () => {
  let mainPageService: MainPageService;

  const mainPageRepositoryMock = jest.fn().mockReturnValue({
    create: jest.fn().mockReturnValue(mainPageCreateData),
    get: jest.fn().mockReturnValue({
      ...mainPageCreateData,
      aboutMePhoto: 'convetFileToBase64',
      firstBlockBackgroundImage: 'convetFileToBase64',
      _id: 'id',
    }),
    update: jest.fn().mockReturnValue({
      ...mainPageCreateData,
      _id: 'id',
    }),
  });

  const imageServiceMock = jest.fn().mockReturnValue({
    saveImage: jest.fn().mockReturnValue('save image'),
    convetFileToBase64: jest.fn().mockReturnValue('convetFileToBase64'),
    convertFilesToBase64ByName: jest
      .fn()
      .mockReturnValue('convertFilesToBase64ByName'),
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

  it('get', async () => {
    const result = await mainPageService.get();

    expect(result).toStrictEqual({
      ...mainPageCreateData,
      aboutMePhoto: 'convetFileToBase64',
      firstBlockBackgroundImage: 'convetFileToBase64',
      _id: 'id',
    });
  });

  it('getImageName', async () => {
    const result = await mainPageService.getImageName();

    expect(result).toStrictEqual({
      firstBlockBackgroundImage: 'convetFileToBase64',
      aboutMePhoto: 'convetFileToBase64',
    });
  });

  it('getImages', () => {
    const result = mainPageService.getImages({ imageName: 'imageName' });

    expect(result).toBe('convertFilesToBase64ByName');
  });
});
