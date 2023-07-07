import { Module } from '@nestjs/common';
import { VKModule } from 'src/utils/vk/vk.module';
import { TelegramModule } from 'src/utils/telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ArticleCron } from './article.cron';
import { RepositoriesModule } from 'src/utils/repositories/repositories.module';

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
