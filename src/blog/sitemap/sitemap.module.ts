import { Module } from '@nestjs/common';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';
import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [SitemapService],
  controllers: [SitemapController],
})
export class SitemapModule {}
