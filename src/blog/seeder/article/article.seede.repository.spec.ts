import { Logger } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Article } from '../../../utils/schemas/blog/article.schema';
import { ArticleSeedRepository } from './article.seed.repository';

describe('ArticleSeedRepository', () => {
  let articleSeedRepository: ArticleSeedRepository;

  const model = jest.fn().mockReturnValue({
    updateMany: jest.fn().mockReturnValue('updateMany'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleSeedRepository,
        {
          provide: getConnectionToken('Database'),
          useValue: {},
        },
        {
          provide: getModelToken(Article.name),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: {},
        },
      ],
    }).compile();

    articleSeedRepository = module.get<ArticleSeedRepository>(
      ArticleSeedRepository,
    );
  });

  it('check updateMany', () => {
    expect(articleSeedRepository.updateMany).toBeDefined();
  });
});
