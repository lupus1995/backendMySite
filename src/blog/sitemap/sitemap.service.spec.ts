import { Test, TestingModule } from '@nestjs/testing';
import { SitemapService } from './sitemap.service';
import { SitemapRepository } from '../utils/repositories/sitemap.repository';

describe('SitemapService', () => {
  let service: SitemapService;

  const sitemapRepository = jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('get'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SitemapService,
        {
          provide: SitemapRepository,
          useFactory: sitemapRepository,
        },
      ],
    }).compile();

    service = module.get<SitemapService>(SitemapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('check get data', async () => {
    expect(await service.get()).toBe('get');
  });
});
