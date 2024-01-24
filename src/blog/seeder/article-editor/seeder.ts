import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';

import { Article, ArticleSchema } from '@utils/schemas/blog/article.schema';

import { AticleEditorSeeder } from './article-editor.seeder';
import { ArticleEditorSeederRepository } from './article-editor.seeder.repository';

seeder({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLink),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [Logger, ArticleEditorSeederRepository],
}).run([AticleEditorSeeder]);
