import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Article } from '../../schemas/article.schema';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from '../../article/dto/article.dto';
import {
  connection,
  model,
  logger,
} from '../../../utils/repositories/mockData';
import { MONGOOSE_LINK_NEST } from '../../../constants';

describe('ArticleRepository', () => {
  let articleRepository: ArticleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_NEST),
          useValue: connection,
        },
        {
          provide: getModelToken(Article.name, MONGOOSE_LINK_NEST),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    articleRepository = module.get<ArticleRepository>(ArticleRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll with filter is false', async () => {
    // @ts-ignore
    model().find.mockReturnThis();
    expect(
      await articleRepository.getAll({
        hasFilter: false,
        limit: 5,
        offset: 10,
      }),
    ).toStrictEqual([]);
  });

  it('getAll with filter is true', async () => {
    // @ts-ignore
    model().find.mockReturnThis();
    expect(
      await articleRepository.getAll({
        hasFilter: true,
        limit: 5,
        offset: 10,
      }),
    ).toStrictEqual([]);
  });

  it('create', () => {
    expect(articleRepository.create).toBeDefined();
  });

  it('findById', async () => {
    expect(await articleRepository.findById('id')).toBe('findById');
  });

  it('getByPublichTelegram', async () => {
    // @ts-ignore
    model().find.mockReturnValue('telegram');
    expect(await articleRepository.getByPublichTelegram()).toBe('telegram');
  });

  it('getByPublichVk', async () => {
    // @ts-ignore
    model().find.mockReturnValue('vk');

    expect(await articleRepository.getByPublichVk()).toBe('vk');
  });

  it('update', async () => {
    expect(
      await articleRepository.update({
        id: 'id',
        data: {} as CreateArticleDto,
      }),
    ).toBe('updateOne');
  });

  it('deleteOne', async () => {
    expect(await articleRepository.delete('id')).toBe('deleteOne');
  });
});
