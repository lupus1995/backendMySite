import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../utils/tokens/token.guard';
import { ArticleService } from './article.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { AuthService } from '../auth/auth.service';
import { VkService } from '../utils/vk/vk.service';
import { TelegramService } from '../utils/telegram/telegram.service';
import { CanActivate } from '@nestjs/common';
import { articleCreatedData } from './mockData';
import { VKModule } from '../utils/vk/vk.module';
import { TelegramModule } from '../utils/telegram/telegram.module';

describe('ArticleController', () => {
  const AuthGuardMock: CanActivate = {
    canActivate: jest.fn().mockReturnValue(false),
  };

  const articleData = {
    ...articleCreatedData,
    _id: 'jlksjfglksdfjfglk',
  };
  let controller: ArticleController;
  const articleServiceMock = jest.fn().mockReturnValue({
    create: jest.fn(() => articleData),
    update: jest.fn(() => articleData),
    delete: jest.fn(() => articleData),
    getArticle: jest.fn(() => articleData),
    getArticles: jest.fn(() => [articleData, articleData]),
  });
  const authService = jest.fn().mockReturnValue(() => ({
    checkToken: jest.fn(() => {
      return true;
    }),
  }));
  const vkService = jest.fn().mockReturnValue(() => ({
    sendPostToVk: jest.fn(),
  }));

  const telegramService = jest.fn().mockReturnValue(() => ({
    sendMessage: jest.fn(),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [VKModule.forRoot(), TelegramModule.forRoot()],
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useFactory: articleServiceMock,
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: AuthService,
          useFactory: authService,
        },
        {
          provide: VkService,
          useFactory: vkService,
        },
        {
          provide: TelegramService,
          useFactory: telegramService,
        },
      ],
    })
      .overrideProvider(AuthGuard)
      .useValue(AuthGuardMock)
      .compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('check createArticle', async () => {
    expect(await controller.createArticle(articleCreatedData)).toBe(
      articleData,
    );
  });

  it('check getArticles', async () => {
    expect(
      await controller.getArticles({ offset: 0, limit: 2, hasFilter: true }),
    ).toStrictEqual([articleData, articleData]);
  });

  it('check getArticle', async () => {
    expect(await controller.getArticle('id')).toBe(articleData);
  });

  it('check deleteArticle', async () => {
    expect(await controller.deleteArticle('id')).toBe(articleData);
  });

  it('check updateArticle', async () => {
    expect(await controller.updateArticle('id', articleCreatedData)).toBe(
      articleData,
    );
  });
});
