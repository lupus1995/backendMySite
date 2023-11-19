import { Module } from '@nestjs/common';

import { ArticleCronModule } from './cron/artucle.cron.module';
import { ArticleUIModule } from './ui/article.ui.module';

@Module({
  imports: [ArticleUIModule, ArticleCronModule],
})
export class ArticleModule {}
