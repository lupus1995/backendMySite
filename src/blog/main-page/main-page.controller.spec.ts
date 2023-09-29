import { MainPageService } from './main-page.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MainPageController } from './main-page.controller';
import { CanActivate } from '@nestjs/common';
import { TokenGuard } from '../../utils/tokens/token.guard';
import { AuthService } from '../../auth/auth.service';
import { mainPageCreateData } from './mockData';
import { TokensService } from '../../utils/tokens/tokens.service';

describe('MainPageController', () => {
  const TokenGuardMock: CanActivate = {
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
    getImage: jest.fn().mockReturnValue('getImage'),
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
          provide: TokensService,
          useValue: {},
        },
        {
          provide: AuthService,
          useFactory: authService,
        },
      ],
    })
      .overrideProvider(TokenGuard)
      .useValue(TokenGuardMock)
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

  it('check getImage', () => {
    expect(controller.getImage('510', 'name')).toBe('getImage');
  });
});
