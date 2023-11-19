import { Module } from '@nestjs/common';

import { ImageModule } from 'src/blog/utils/image/image.module';
import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

import { MainPageController } from './main-page.controller';
import { MainPageService } from './main-page.service';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [MainPageService],
  controllers: [MainPageController],
})
export class MainPageModule {}
