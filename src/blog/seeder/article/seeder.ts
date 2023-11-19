import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { seeder } from 'nestjs-seeder';

import { ArticleSeedRepository } from './article.seed.repository';
import { AticleSeeder } from './article.seeder';
import {
  Article,
  ArticleSchema,
} from '../../../utils/schemas/blog/article.schema';

dotenv.config();

// работа с сущностью статей

seeder({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLink),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [Logger, ArticleSeedRepository],
}).run([AticleSeeder]);
