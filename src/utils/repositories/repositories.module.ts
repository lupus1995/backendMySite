import { Logger, Module } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { UserRepository } from './user.repository';
import { MainPageRepository } from './main-page.repository';
import { ProjectsRepository } from './projects.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackRepository } from './feedback.repository';
import { SitemapRepository } from './sitemap.repository';
import { ARTICLE, PROJECTS, MAIN_PAGE, USER, FEEDBACK } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([ARTICLE, PROJECTS, MAIN_PAGE, USER, FEEDBACK]),
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
