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
    const articlesTelegram =
      await this.articleRepository.getByPublichTelegram();
    for (let i = 0; i < articlesTelegram.length; i++) {
      const message = `${process.env.domen}/${articlesTelegram[i]._id}`;
      await this.telegramService.sendMessage({ message });

      await this.articleRepository.update({
        id: articlesTelegram[i]._id,
        article: {
          ...articlesTelegram[i],
          isPublishedlegram: true,
          createdAt: new Date(articlesTelegram[i].createdAt).toISOString(),
          updatedAt: new Date(articlesTelegram[i].updatedAt).toISOString(),
          publishedAt: new Date(articlesTelegram[i].publishedAt).toISOString(),
        },
      });
    }

    const articlesVk = await this.articleRepository.getByPublichVk();
    for (let i = 0; i < articlesVk.length; i++) {
      const message = `${process.env.domen}/${articlesVk[i]._id}`;
      await this.telegramService.sendMessage({ message });

      await this.articleRepository.update({
        id: articlesVk[i]._id,
        article: {
          ...articlesVk[i],
          isPublishedVK: true,
          createdAt: new Date(articlesVk[i].createdAt).toISOString(),
          updatedAt: new Date(articlesVk[i].updatedAt).toISOString(),
          publishedAt: new Date(articlesVk[i].publishedAt).toISOString(),
        },
      });
    }
  }
}
