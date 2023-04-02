import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramService } from 'src/utils/telegram/telegram.service';
import { VkService } from 'src/utils/vk/vk.service';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleCron {
  private readonly logger: Logger;
  constructor(
    private articleRepository: ArticleRepository,
    private vkService: VkService,
    private telegramService: TelegramService,
  ) {
    this.logger = new Logger();
  }

  @Cron('* 1 * * * *')
  async sendPost() {
    const articles = await this.articleRepository.getByDate();
    for (let i = 0; i < articles.length; i++) {
      const message = `${process.env.domen}/${articles[i]._id}`;
      await this.vkService.sendPostToVk({ message });
      await this.telegramService.sendMessage({ message });

      await this.articleRepository.update({
        id: articles[i]._id,
        article: {
          ...articles[i],
          isPublishedlegram: true,
          isPublishedVK: true,
          createdAt: new Date(articles[i].createdAt).toISOString(),
          updatedAt: new Date(articles[i].updatedAt).toISOString(),
          publishedAt: new Date(articles[i].publishedAt).toISOString(),
        },
      });
    }
  }
}
