import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ImageModule } from 'src/utils/image/image.module';
import { RepositoriesModule } from 'src/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';
import { ArticleService } from './article.service';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleUIModule {}
