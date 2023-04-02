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

  @Cron('1 * * * * *')
  async sendPost() {
    const articlesTelegram =
      await this.articleRepository.getByPublichTelegram();
    for (let i = 0; i < articlesTelegram.length; i++) {
      const message = `${process.env.domen}/${articlesTelegram[i]._id}`;
      const result = await this.telegramService.sendMessage({ message });

      if (new Date(result.date).toISOString()) {
        articlesTelegram[i].isPublishedlegram = true;
        await this.articleRepository.update({
          id: articlesTelegram[i]._id,
          // @ts-ignore
          article: articlesTelegram[i],
        });
      }
    }

    const articlesVk = await this.articleRepository.getByPublichVk();
    for (let i = 0; i < articlesVk.length; i++) {
      const message = `${process.env.domen}/${articlesVk[i]._id}`;
      const result = await this.vkService.sendPostToVk({ message });

      if (result.post_id) {
        articlesVk[i].isPublishedVK = true;
        await this.articleRepository.update({
          id: articlesVk[i]._id,
          // @ts-ignore
          article: articlesVk[i],
        });
      }
    }
  }
}
