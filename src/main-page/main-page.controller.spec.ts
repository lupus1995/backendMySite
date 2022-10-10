import { MainPageService } from './main-page.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MainPageController } from './main-page.controller';

describe('MainPageController', () => {
  const mainPageCreateData = {
    firstBlockBackgroundImage: 'firstBlockBackgroundImage',
    firstBlockTitle: 'firstBlockTitle',
    firstBlockSubtitle: 'firstBlockSubtitle',
    aboutMeTitle: 'aboutMeTitle',
    aboutMeDescription: 'aboutMeDescription',
    aboutMePhoto: 'aboutMePhoto',
  }

  const mainPageData = {
    ...mainPageCreateData,
    _id: 'fsdfk;fsldf',
  }

  const mainPageService = jest.fn(() => ({
    create: jest.fn(({ createMainPageDto }) => mainPageData),
    update: jest.fn(({ createMainPageDto, id }) => mainPageData),
    get: jest.fn(({ id }) => mainPageData)
  }))
  let controller: MainPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainPageController],
      providers: [
        {
          provide: MainPageService,
          useFactory: mainPageService,
        }
      ]
    }).compile();

    controller = module.get<MainPageController>(MainPageController);
  });

  it('check createMainPage', async () => {
    expect(await controller.createMainPage(mainPageCreateData)).toBe(mainPageData);
  });

  it('check getMainPage', async () => {
    expect(await controller.getMainPage('id')).toBe(mainPageData);
  });

  it('check updateMainPage', async () => {
    expect(await controller.updateMainPage(mainPageCreateData, 'id')).toBe(mainPageData);
  });
});
