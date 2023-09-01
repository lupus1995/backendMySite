import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { ArticleSeedRepository } from './article.seed.repository';

@Injectable()
export class AticleSeeder implements Seeder {
  constructor(
    private articleSeedRepository: ArticleSeedRepository,
    private logger: Logger,
  ) {}

  // обновление статуса статей по публикации в вконтакте и телеграмм
  async seed(): Promise<void> {
    await this.articleSeedRepository.updateMany();
  }

  async drop() {
    this.logger.log('drop');
  }
}
