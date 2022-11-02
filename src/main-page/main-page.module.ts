import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainPage, MainPageSchema } from 'src/schemas/mainPage.schema';
import { MainPageService } from './main-page.service';
import { MainPageController } from './main-page.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: MainPage.name, schema: MainPageSchema }]),
        JwtModule,
    ],
    providers: [MainPageService],
    controllers: [MainPageController]
})
export class MainPageModule {}
