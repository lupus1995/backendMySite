import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ImageModule } from 'src/blog/utils/image/image.module';
import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { ArticleService } from './article.service';
import { TokensModule } from 'src/utils/tokens/tokens.module';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleUIModule {}