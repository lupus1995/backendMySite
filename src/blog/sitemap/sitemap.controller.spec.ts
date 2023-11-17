import { Test, TestingModule } from '@nestjs/testing';

import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';

describe('SitemapController', () => {
  let controller: SitemapController;

  const sitemapSerivce = jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('get'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SitemapController],
      providers: [
        {
          provide: SitemapService,
          useFactory: sitemapSerivce,
        },
      ],
    }).compile();

    controller = module.get<SitemapController>(SitemapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('check get data', async () => {
    const result = await controller.getDataForSitemap();

    expect(result).toBe('get');
  });
});
