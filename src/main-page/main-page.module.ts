import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainPage, MainPageSchema } from 'src/schemas/mainPage.schema';
import { MainPageService } from './main-page.service';
import { MainPageController } from './main-page.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/utils/image/image.module';
import { MainPageRepository } from './main-page.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MainPage.name, schema: MainPageSchema },
    ]),
    AuthModule,
    ImageModule,
  ],
  providers: [MainPageService, MainPageRepository],
  controllers: [MainPageController],
})
export class MainPageModule {}
