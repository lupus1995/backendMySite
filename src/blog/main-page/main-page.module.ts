import { Module } from '@nestjs/common';
import { MainPageService } from './main-page.service';
import { MainPageController } from './main-page.controller';
import { ImageModule } from 'src/blog/utils/image/image.module';
import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { TokensModule } from 'src/blog/utils/tokens/tokens.module';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [MainPageService],
  controllers: [MainPageController],
})
export class MainPageModule {}
