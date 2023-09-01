import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainPageModule } from './main-page/main-page.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ProjectsModule } from './projects/projects.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { MONGOOSE_LINK_NEST } from '../constants';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLink, {
      useNewUrlParser: true,
      connectionName: MONGOOSE_LINK_NEST,
    }),
    MainPageModule,
    ArticleModule,
    AuthModule,
    FeedbackModule,
    ProjectsModule,
    SitemapModule,
  ],
})
export class BlogModule {}
