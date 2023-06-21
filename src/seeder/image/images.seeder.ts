import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Article } from 'src/schemas/article.schema';
import { MainPage } from 'src/schemas/mainPage.schema';
import { Projects } from 'src/schemas/projects.schema';
import { ImageService } from 'src/utils/image/image.service';

@Injectable()
export class ImageSeeder implements Seeder {
  private rootFolder = './images';
  constructor(
    @InjectModel(Article.name) private readonly article: Model<Article>,
    @InjectModel(MainPage.name) private readonly mainPage: Model<MainPage>,
    @InjectModel(Projects.name) private readonly projects: Model<Projects>,
    private imageService: ImageService,
    private logger: Logger,
  ) {}

  // получение информации об названии картинок из базы данных
  private async getData(): Promise<string[]> {
    const articles = await this.article.find();
    this.logger.log('Статьи получены из базы данных');
    const mainPage = await this.mainPage.find();
    this.logger.log('Главная страница получена из базы данных');
    const projects = await this.projects.find();
    this.logger.log('Проекты получены из базы данных');

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
