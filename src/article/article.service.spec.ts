import { Test } from '@nestjs/testing';
import { ImageService } from '../utils/image/image.service';
import { ArticleRepository } from '../utils/repositories/article.repository';
import { ArticleService } from './article.service';
import { articleCreatedData } from './mockData';

describe('ArticleService', () => {
  let articleService: ArticleService;

  const imageServiceMock = jest.fn().mockReturnValue({
    saveImage: jest.fn().mockResolvedValue('save image'),
    deletedFiles: jest.fn(),
    convetFileToBase64: jest.fn().mockReturnValue('convert'),
  });

  const createdArticles = {
    ...articleCreatedData,
    _id: 'id',
  };

  const articleRepositoryMock = jest.fn().mockReturnValue({
    getAll: jest.fn().mockReturnValue([createdArticles]),
    create: jest.fn().mockReturnValue(createdArticles),
    findById: jest.fn().mockReturnValue(createdArticles),
    update: jest.fn().mockReturnValue(createdArticles),
    delete: jest.fn().mockReturnValue(createdArticles),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: ImageService,
          useFactory: imageServiceMock,
        },
        {
          provide: ArticleRepository,
          useFactory: articleRepositoryMock,
        },
      ],
    }).compile();

    articleService = await module.get(ArticleService);
  });

  afterEach(() => jest.clearAllMocks());

  it('create', async () => {
    const result = await articleService.create({
      createArticle: articleCreatedData,
    });

    expect(JSON.stringify(result)).toBe(JSON.stringify(createdArticles));
  });

  it('update', async () => {
    const result = await articleService.update({
      createArticle: articleCreatedData,
      id: 'id',
    });

    expect(JSON.stringify(result)).toBe(JSON.stringify(createdArticles));
  });

  it('delete', async () => {
    const result = await articleService.delete({
      id: 'id',
    });

    expect(JSON.stringify(result)).toBe(JSON.stringify(createdArticles));
  });

  it('getArticle', async () => {
    const result = await articleService.getArticle({
      id: 'id',
    });

    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        ...createdArticles,
        thumbnail: 'convert',
      }),
    );
  });

  it('getArticles', async () => {
    const result = await articleService.getArticles({
      offset: 0,
      limit: 10,
    });

    expect(JSON.stringify(result)).toBe(JSON.stringify([createdArticles]));
  });
});
