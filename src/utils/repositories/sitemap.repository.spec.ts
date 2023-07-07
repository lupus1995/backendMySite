import { Test, TestingModule } from '@nestjs/testing';
import { SitemapRepository } from './sitemap.repository';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { connection, logger, model } from './mockData';
import { Projects } from '../../schemas/projects.schema';
import { Article } from '../../schemas/article.schema';
import { Logger } from '@nestjs/common';

describe('SitemapRepository', () => {
  let sitemapRepository: SitemapRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SitemapRepository,
        {
          provide: getConnectionToken('Database'),
          useValue: connection,
        },
        {
          provide: getModelToken(Projects.name),
          useFactory: model,
        },
        {
          provide: getModelToken(Article.name),
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
