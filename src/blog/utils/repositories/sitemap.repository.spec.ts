import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { connection, logger, model } from '@utils/repositories/mockData';
import { Article } from '@utils/schemas/blog/article.schema';
import { Projects } from '@utils/schemas/blog/projects.schema';
import { MONGOOSE_LINK_NEST } from 'src/constants';

import { SitemapRepository } from './sitemap.repository';

describe('SitemapRepository', () => {
  let sitemapRepository: SitemapRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SitemapRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_NEST),
          useValue: connection,
        },
        {
          provide: getModelToken(Projects.name, MONGOOSE_LINK_NEST),
          useFactory: model,
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

    sitemapRepository = module.get<SitemapRepository>(SitemapRepository);
  });

  it('get', async () => {
    model().find.mockReturnValue([]);

    expect(await sitemapRepository.get()).toStrictEqual({
      articles: [],
      projects: [],
    });
  });
});
