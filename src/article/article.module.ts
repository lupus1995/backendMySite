import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ImageModule } from 'src/utils/image/image.module';
import { VKModule } from 'src/utils/vk/vk.module';
import { TelegramModule } from 'src/utils/telegram/telegram.module';
import { ArticleCron } from './article.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { RepositoriesModule } from 'src/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

@Module({
  imports: [
    TokensModule,
    RepositoriesModule,
    ImageModule,
    VKModule.forRoot(),
    TelegramModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  providers: [ArticleService, ArticleCron],
  controllers: [ArticleController],
})
export class ArticleModule {}
