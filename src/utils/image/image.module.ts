import { Module } from '@nestjs/common';
import { SharpModule } from 'nestjs-sharp';
import { ImageService } from './image.service';

@Module({
  imports: [SharpModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
