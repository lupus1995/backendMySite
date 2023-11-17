import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { TelegramModule } from 'src/blog/utils/telegram/telegram.module';
import { VKModule } from 'src/blog/utils/vk/vk.module';

import { ArticleCron } from './article.cron';

@Module({
  imports: [
    RepositoriesModule,
    VKModule.forRoot(),
    TelegramModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  providers: [ArticleCron],
})
export class ArticleCronModule {}
