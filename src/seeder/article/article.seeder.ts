import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/schemas/article.schema';

@Injectable()
export class AticleSeeder implements Seeder {
  constructor(
    @InjectModel(Article.name) private readonly article: Model<Article>,
    private logger: Logger,
  ) {}

  // обновление статуса статей по публикации в вконтакте и телеграмм
  async seed(): Promise<any> {
    await this.article.updateMany(
      {
        isPublishedVK: undefined,
        isPublishedlegram: undefined,
      },
      {
        $set: {
          isPublishedVK: true,
          isPublishedlegram: true,
        },
      },
    );
  }

  async drop() {
    this.logger.log('drop');
  }
}
