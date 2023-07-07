import { Module } from '@nestjs/common';
import { ArticleUIModule } from './ui/article.ui.module';
import { ArticleCronModule } from './cron/artucle.cron.module';

@Module({
  imports: [ArticleUIModule, ArticleCronModule],
})
export class ArticleModule {}
