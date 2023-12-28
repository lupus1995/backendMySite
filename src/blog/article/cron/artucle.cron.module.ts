import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { RepositoriesModule } from 'blog/utils/repositories/repositories.module';
import { TelegramModule } from 'blog/utils/telegram/telegram.module';
import { VKModule } from 'blog/utils/vk/vk.module';

import { ArticleCron } from './article.cron';

@Module({
  imports: [
    RepositoriesModule,
    VKModule.forRoot(),
    TelegramModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  providers: [ArticleCron, Logger],
})
export class ArticleCronModule {}
