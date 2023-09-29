import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramService } from '../../utils/telegram/telegram.service';
import { VkService } from '../../utils/vk/vk.service';
import { ArticleRepository } from 'src/blog/utils/repositories/article.repository';

// не получилось написать тесты на крон таску из-за нижеописанной ошибки
// You need to run with a version of node that supports ES Modules in the VM API

@Injectable()
export class ArticleCron {
  constructor(
    private articleRepository: ArticleRepository,
    private vkService: VkService,
    private telegramService: TelegramService,
  ) {}

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
          data: articlesTelegram[i],
        });
      }
    }

    const articlesVk = await this.articleRepository.getByPublichVk();
    for (let i = 0; i < articlesVk.length; i++) {
      const message = `${process.env.domen}/${articlesVk[i]._id}`;
      const result = await this.vkService.sendPostToVk({
        attachments: message,
        description: articlesVk[i].description.ru,
      });

      if (result.post_id) {
        articlesVk[i].isPublishedVK = true;
        await this.articleRepository.update({
          id: articlesVk[i]._id,
          // @ts-ignore
          data: articlesVk[i],
        });
      }
    }
  }
}
