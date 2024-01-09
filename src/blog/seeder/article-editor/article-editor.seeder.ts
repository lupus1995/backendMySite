import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';

import { ArticleEditorSeederRepository } from './article-editor.seeder.repository';

@Injectable()
export class AticleEditorSeeder implements Seeder {
  constructor(
    private logger: Logger,
    private articleEditorSeederRepository: ArticleEditorSeederRepository,
  ) {}

  // добавление функционала для использования нескольких типов редакторов для ранее опубликованных статей до 01.2024
  async seed(): Promise<void> {
    await this.articleEditorSeederRepository.updateEditorField();
  }

  async drop() {
    this.logger.log('drop');
  }
}
