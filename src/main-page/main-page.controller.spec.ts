import { MainPageService } from './main-page.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MainPageController } from './main-page.controller';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { mainPageCreateData } from './mockData';

describe('MainPageController', () => {
  const AuthGuardMock: CanActivate = {
    canActivate: jest.fn().mockReturnValue(false),
  };

  const mainPageData = {
    ...mainPageCreateData,
    _id: 'fsdfk;fsldf',
  };

  const mainPageService = jest.fn(() => ({
    create: jest.fn(() => mainPageData),
    update: jest.fn(() => mainPageData),
    get: jest.fn(() => mainPageData),
    getImageName: jest.fn().mockReturnValue('getImageName'),
    getImages: jest.fn().mockReturnValue('getImages'),
  }));

  const authService = jest.fn().mockReturnValue(() => ({
    checkToken: jest.fn(() => {
      return true;
    }),
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
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: AuthService,
          useFactory: authService,
        },
      ],
    })
      .overrideProvider(AuthGuard)
      .useValue(AuthGuardMock)
      .compile();

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

  it('getImageName', async () => {
    expect(await controller.getImageName()).toBe('getImageName');
  });

  it('getImamges', async () => {
    expect(await controller.getImamges('imageName')).toBe('getImages');
  });
});
