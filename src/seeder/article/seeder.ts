import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { AticleSeeder } from './article.seeder';
import { Logger } from '@nestjs/common';

dotenv.config();

// работа с сущностью статей

seeder({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLink),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [Logger],
}).run([AticleSeeder]);
