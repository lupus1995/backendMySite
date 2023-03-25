import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/utils/image/image.module';
import { ArticleRepository } from './article.repository';
import { VKModule } from 'src/utils/vk/vk.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    AuthModule,
    ImageModule,
    VKModule.forRoot(),
  ],
  providers: [ArticleService, ArticleRepository],
  controllers: [ArticleController],
})
export class ArticleModule {}
