import { Module } from '@nestjs/common';

import { ImageModule } from 'src/blog/utils/image/image.module';
import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { DictionariesController } from './dictionaries.controller';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [ArticleService],
  controllers: [ArticleController, DictionariesController],
})
export class ArticleUIModule {}
