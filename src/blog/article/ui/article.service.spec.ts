import { Test } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { ImageService } from '../../utils/image/image.service';
import { ArticleRepository } from 'src/blog/utils/repositories/ArticleRepository';
import { Logger } from '@nestjs/common';
import { CreateArticleDto } from '../dto/article.dto';

let articleServiceMock: ArticleService;

const imageServiceMock = jest.fn().mockReturnValue({
  saveImageBase64: jest.fn().mockReturnValue('saveImageBase64'),
  deletedFiles: jest.fn().mockReturnValue('deletedFiles'),
  getFile: jest.fn().mockReturnValue('getFile'),
});

const articleRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue('create'),
  findById: jest.fn().mockReturnValue({
    thumbnail: 'thumbnail.hhh',
  }),
  update: jest.fn().mockReturnValue('update'),
  delete: jest.fn().mockReturnValue('delete'),
  getAll: jest.fn().mockReturnValue([]),
});

describe('ArticleService', () => {
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
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    articleServiceMock = await module.get(ArticleService);
  });

  afterEach(() => jest.clearAllMocks());

  it('check create', async () => {
    const result = await articleServiceMock.create({
      createArticle: {} as CreateArticleDto,
    });

    expect(articleServiceMock.create).toBeDefined();
    expect(result).toBe('create');
  });
  it('check update', async () => {
    const result = await articleServiceMock.update({
      id: 'iud',
      createArticle: {} as CreateArticleDto,
    });

    expect(articleServiceMock.update).toBeDefined();
    expect(result).toBe('update');
  });
  it('check delete', async () => {
    const result = await articleServiceMock.delete({
      id: 'sdfs',
    });

    expect(articleServiceMock.delete).toBeDefined();
    expect(result).toBe('delete');
  });
  it('check getArticle', async () => {
    const result = await articleServiceMock.getArticle({
      id: 'sdfs',
    });

    expect(articleServiceMock.getArticle).toBeDefined();
    expect(result).toStrictEqual({
      thumbnail: 'thumbnail.hhh',
    });
  });
  it('check getArticles', async () => {
    const result = await articleServiceMock.getArticles({
      offset: 0,
      limit: 10,
      hasFilter: false,
    });

    expect(articleServiceMock.getArticles).toBeDefined();
    expect(result).toStrictEqual([]);
  });
  it('check getFile', async () => {
    const result = await articleServiceMock.getFile({
      id: 'id',
      size: 'size',
    });

    expect(articleServiceMock.getFile).toBeDefined();
    expect(result).toBe('getFile');
  });
});
