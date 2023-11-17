import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MONGOOSE_LINK_NEST } from 'src/constants';

import { ArticleRepository } from './article.repository';
import { ARTICLE, PROJECTS, MAIN_PAGE, USER, FEEDBACK } from './constants';
import { FeedbackRepository } from './feedback.repository';
import { MainPageRepository } from './main-page.repository';
import { ProjectsRepository } from './projects.repository';
import { SitemapRepository } from './sitemap.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [ARTICLE, PROJECTS, MAIN_PAGE, USER, FEEDBACK],
      MONGOOSE_LINK_NEST,
    ),
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
