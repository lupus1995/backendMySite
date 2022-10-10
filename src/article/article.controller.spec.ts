import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './../auth/auth.guard';
import { ArticleService } from './article.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
  const AuthGuardMock = { CanActivate: jest.fn(() => true) };
  const articleCreatedData = {
    title: 'title',
    description: 'description',
    thumbnail: 'thumbnail',
    text: 'text',
    keyWords: 'keyWords',
  }

  const articleData = {
    ...articleCreatedData,
    _id: 'jlksjfglksdfjfglk',
  }
  let controller: ArticleController;
  const articleServiceMock = jest.fn(() => ({
    create: jest.fn(({ createArticle }) => articleData),
    update: jest.fn(({ createArticle, id }) => articleData),
    delete: jest.fn(({ id }) => articleData),
    getArticle: jest.fn(({ id }) => articleData),
    getArticles: jest.fn(({ offset, limit }) => [articleData, articleData])
  }))

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
        }
      ]
    })
    .overrideProvider(AuthGuard).useValue(AuthGuardMock)
    .compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('check createArticle', async () => {
    expect(await controller.createArticle(articleCreatedData)).toBe(articleData);
  });

  it('check getArticles', async () => {
    expect(await controller.getArticles({offset: 0, limit: 2})).toStrictEqual([articleData, articleData]);
  });

  it('check getArticle', async () => {
    expect(await controller.getArticle('id')).toBe(articleData);
  });

  it('check deleteArticle', async () => {
    expect(await controller.deleteArticle('id')).toBe(articleData);
  });

  it('check updateArticle', async () => {
    expect(await controller.updateArticle('id', articleCreatedData)).toBe(articleData);
  });
});
