import { Logger, Module } from '@nestjs/common';
import { SharpModule } from 'nestjs-sharp';

import { ArticleImageService } from './article-image.service';
import { ImageService } from './image.service';

@Module({
  imports: [SharpModule],
  providers: [ImageService, Logger, ArticleImageService],
  exports: [ImageService, ArticleImageService],
})
export class ImageModule {}
