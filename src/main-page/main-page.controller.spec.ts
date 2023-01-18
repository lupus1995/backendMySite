import { MainPageService } from './main-page.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MainPageController } from './main-page.controller';
import { CreateMainPageDto } from './main-page.dto';

describe('MainPageController', () => {
  const mainPageCreateData: CreateMainPageDto = {
    firstBlockBackgroundImage: 'firstBlockBackgroundImage',
    firstBlockTitle: {
      en: 'firstBlockTitle',
      ru: 'заголовок первой статьи',
    },
    firstBlockSubtitle: {
      en: 'firstBlockSubtitle',
      ru: 'подзаголовок первой статьи',
    },
    aboutMeTitle: {
      en: 'aboutMeTitle',
      ru: 'заголовок обо мне',
    },
    aboutMeDescription: {
      en: 'aboutMeDescription',
      ru: 'описание обо мне',
    },
    aboutMePhoto: 'aboutMePhoto',
  };

  const mainPageData = {
    ...mainPageCreateData,
    _id: 'fsdfk;fsldf',
  };

  const mainPageService = jest.fn(() => ({
    create: jest.fn(() => mainPageData),
    update: jest.fn(() => mainPageData),
    get: jest.fn(() => mainPageData),
  }));
  let controller: MainPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainPageController],
      providers: [
        {
          provide: MainPageService,
          useFactory: mainPageService,
        },
      ],
    }).compile();

    controller = module.get<MainPageController>(MainPageController);
  });

  it('check createMainPage', async () => {
    expect(await controller.createMainPage(mainPageCreateData)).toBe(
      mainPageData,
    );
  });

  it('check getMainPage', async () => {
    expect(await controller.getMainPage()).toBe(mainPageData);
  });

  it('check updateMainPage', async () => {
    expect(await controller.updateMainPage(mainPageCreateData, 'id')).toBe(
      mainPageData,
    );
  });
});
