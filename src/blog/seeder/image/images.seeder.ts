import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';

import { ImageSeedRepository } from './image.seed.repository';
import { Article } from '../../../utils/schemas/blog/article.schema';
import { Projects } from '../../../utils/schemas/blog/projects.schema';
import { ImageService } from '../../utils/image/image.service';

@Injectable()
export class ImageSeeder implements Seeder {
  private rootFolder = './images';
  constructor(
    private imageSeedRepository: ImageSeedRepository,
    private imageService: ImageService,
    private logger: Logger,
  ) {}

  // получение информации об названии картинок из базы данных
  private async getData(): Promise<string[]> {
    const { articles, projects, mainPage } =
      await this.imageSeedRepository.getData();

    const articlesImages = articles.map(
      (article: Article) => article.thumbnail,
    );

    const projectsImages = projects.map(
      (project: Projects) => project.thumbnail,
    );

    const images: string[] = [
      ...articlesImages,
      ...projectsImages,
      mainPage[0].firstBlockBackgroundImage,
      mainPage[0].aboutMePhoto,
    ];
    this.logger.log('Картинки собраны');

    return images;
  }

  // нарезка новых картинок
  async seed(): Promise<void> {
    const images: string[] = await this.getData();

    images.forEach((image) => {
      this.imageService.saveImageFromPath({
        name: image,
        rootFolder: this.rootFolder,
      });

      this.logger.log('Новые версии нарезанных картинок сохранены');
    });
  }

  // удаление старых версий картинок с сохранением оригинала
  async drop(): Promise<void> {
    const images: string[] = await this.getData();

    images.forEach((image) => {
      this.imageService.deletedFiles({
        nameImage: image,
        rootFolder: this.rootFolder,
        isDeleteOriginFile: false,
      });

      this.logger.log('Старые версии нарезанных картинок удалены');
    });
  }
}
