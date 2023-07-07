import { Test } from '@nestjs/testing';
import { ArticleSeedRepository } from './article.seed.repository';
import { AticleSeeder } from './article.seeder';
import { Logger } from '@nestjs/common';

describe('ArticleSeeder', () => {
  let articleSeed: AticleSeeder;

  const articleSeedRepository = jest.fn().mockReturnValue({
    updateMany: jest.fn().mockReturnValue('updateMany'),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AticleSeeder,
        {
          provide: ArticleSeedRepository,
          useFactory: articleSeedRepository,
        },
        {
          provide: Logger,
          useValue: {},
        },
      ],
    }).compile();

    articleSeed = module.get<AticleSeeder>(AticleSeeder);
  });

  it('seed', () => {
    expect(articleSeed.seed).toBeDefined();
  });
});
