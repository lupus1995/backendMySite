import { Test, TestingModule } from '@nestjs/testing';
import { SitemapRepository } from './sitemap.repository';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import {
  connection,
  logger,
  model,
} from '../../../utils/repositories/mockData';
import { Projects } from '../../../utils/schemas/blog/projects.schema';
import { Article } from '../../../utils/schemas/blog/article.schema';
import { Logger } from '@nestjs/common';
import { MONGOOSE_LINK_NEST } from '../../../constants';

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
    // @ts-ignore
    model().find.mockReturnValue([]);

    expect(await sitemapRepository.get()).toStrictEqual({
      articles: [],
      projects: [],
    });
  });
});
