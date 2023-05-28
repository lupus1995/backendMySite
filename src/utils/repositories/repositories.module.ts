import { Logger, Module } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { UserRepository } from './user.repository';
import { MainPageRepository } from './main-page.repository';
import { ProjectsRepository } from './projects.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Projects, ProjectsSchema } from 'src/schemas/projects.schema';
import { MainPage, MainPageSchema } from 'src/schemas/mainPage.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { FeedbackRepository } from './feedback.repository';
import { Feedback, FeedbackSchema } from 'src/schemas/feedback.schema';
import { SitemapRepository } from './sitemap.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Projects.name, schema: ProjectsSchema },
      { name: MainPage.name, schema: MainPageSchema },
      { name: User.name, schema: UserSchema },
      { name: Article.name, schema: ArticleSchema },
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  providers: [
    ArticleRepository,
    UserRepository,
    MainPageRepository,
    ProjectsRepository,
    FeedbackRepository,
    SitemapRepository,
    Logger,
  ],
  exports: [
    ArticleRepository,
    UserRepository,
    MainPageRepository,
    ProjectsRepository,
    FeedbackRepository,
    SitemapRepository,
    Logger,
  ],
})
export class RepositoriesModule {}
