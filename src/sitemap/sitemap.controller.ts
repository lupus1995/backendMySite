import { Controller, Get } from '@nestjs/common';
import { SitemapService } from './sitemap.service';

@Controller('sitemap')
export class SitemapController {
  constructor(private sitemapService: SitemapService) {}

  @Get()
  async getDataForSitemap() {
    return await this.sitemapService.get();
  }
}
