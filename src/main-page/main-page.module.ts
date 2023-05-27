import { Module } from '@nestjs/common';
import { MainPageService } from './main-page.service';
import { MainPageController } from './main-page.controller';
import { ImageModule } from 'src/utils/image/image.module';
import { RepositoriesModule } from 'src/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

@Module({
  imports: [TokensModule, RepositoriesModule, ImageModule],
  providers: [MainPageService],
  controllers: [MainPageController],
})
export class MainPageModule {}
