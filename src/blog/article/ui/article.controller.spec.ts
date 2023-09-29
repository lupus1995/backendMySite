import { CanActivate } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { ArticleGuard } from '../article.guard';
import { TokenGuard } from '../../../utils/tokens/token.guard';
import { TokensService } from '../../../utils/tokens/tokens.service';
import { ArticleRepository } from 'src/blog/utils/repositories/ArticleRepository';
import { CreateArticleDto } from '../dto/article.dto';

const articleGuardMock: CanActivate = {
  canActivate: jest.fn().mockReturnValue(false),
};

const tokenGuardMock: CanActivate = {
  canActivate: jest.fn().mockReturnValue(false),
};

const articleServiceMock = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue('create'),
  getArticle: jest.fn().mockReturnValue('getArticle'),
  getArticles: jest.fn().mockReturnValue('getArticles'),
  delete: jest.fn().mockReturnValue('delete'),
  update: jest.fn().mockReturnValue('update'),
  getFile: jest.fn().mockReturnValue('getFile'),
});

const tokenServiceMock = jest.fn().mockReturnValue({
  checkToken: jest.fn(),
});

let controller: ArticleController;

describe('ArticleController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useFactory: articleServiceMock,
        },
        {
          provide: TokensService,
          useFactory: tokenServiceMock,
        },
        {
          provide: ArticleRepository,
          useValue: {},
        },
      ],
    })
      .overrideProvider(ArticleGuard)
      .useValue(articleGuardMock)
      .overrideProvider(TokenGuard)
      .useValue(tokenGuardMock)
      .compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('check getArticles', async () => {
    expect(
      await controller.getArticles({ offset: 10, limit: 10, hasFilter: false }),
    ).toBe('getArticles');
  });
  it('check getArticle', async () => {
    expect(await controller.getArticle('_435345')).toBe('getArticle');
  });
  it('check createArticle', async () => {
    expect(await controller.createArticle({} as CreateArticleDto)).toBe(
      'create',
    );
  });
  it('check deleteArticle', async () => {
    expect(await controller.deleteArticle('23423')).toBe('delete');
  });
  it('check updateArticle', async () => {
    expect(
      await controller.updateArticle('123123123', {} as CreateArticleDto),
    ).toBe('update');
  });
  it('check getFile', async () => {
    expect(await controller.getFile('123123', '11')).toBe('getFile');
  });
});
