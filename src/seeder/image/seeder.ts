import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { seeder } from 'nestjs-seeder';
import * as dotenv from 'dotenv';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { MainPage, MainPageSchema } from 'src/schemas/mainPage.schema';
import { Projects, ProjectsSchema } from 'src/schemas/projects.schema';
import { ImageModule } from 'src/utils/image/image.module';
import { ImageSeeder } from './images.seeder';

dotenv.config();

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: MainPage.name, schema: MainPageSchema },
      { name: Projects.name, schema: ProjectsSchema },
    ]),
    ImageModule,
  ],
  providers: [Logger],
}).run([ImageSeeder]);
