import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { seeder } from 'nestjs-seeder';

import { ImageModule } from 'src/blog/utils/image/image.module';
import { Article, ArticleSchema } from 'src/utils/schemas/blog/article.schema';
import {
  MainPage,
  MainPageSchema,
} from 'src/utils/schemas/blog/mainPage.schema';
import {
  Projects,
  ProjectsSchema,
} from 'src/utils/schemas/blog/projects.schema';

import { ImageSeedRepository } from './image.seed.repository';
import { ImageSeeder } from './images.seeder';

dotenv.config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLink),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: MainPage.name, schema: MainPageSchema },
      { name: Projects.name, schema: ProjectsSchema },
    ]),
    ImageModule,
  ],
  providers: [Logger, ImageSeedRepository],
}).run([ImageSeeder]);
