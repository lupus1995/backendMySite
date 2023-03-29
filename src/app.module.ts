import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainPageModule } from './main-page/main-page.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLink, { useNewUrlParser: true }),
    MainPageModule,
    ArticleModule,
    AuthModule,
    UserModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
