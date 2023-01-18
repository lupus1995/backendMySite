import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './../auth/auth.guard';
import { ArticleService } from './article.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { CreateArticleDto } from './article.dto';
import { AuthService } from '../auth/auth.service';
import { CanActivate } from '@nestjs/common';

describe('ArticleController', () => {
  const AuthGuardMock: CanActivate = {
    canActivate: jest.fn().mockReturnValue(false),
  };
  const articleCreatedData: CreateArticleDto = {
    title: {
      ru: 'заголовок',
      en: 'title',
    },
    description: {
      ru: 'описание',
      en: 'description',
    },
    thumbnail: 'thumbnail',
    text: {
      ru: 'текст',
      en: 'text',
    },
    keyWords: {
      ru: 'ключевые слова',
      en: 'key words',
    },
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    hidePublishedArticle: false,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    expect(await controller.getArticles({ offset: 0, limit: 2 })).toStrictEqual(
      [articleData, articleData],
    );
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
