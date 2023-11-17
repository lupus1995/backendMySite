import { Module } from '@nestjs/common';

import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';

import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';

@Module({
  imports: [RepositoriesModule],
  providers: [SitemapService],
  controllers: [SitemapController],
})
export class SitemapModule {}
