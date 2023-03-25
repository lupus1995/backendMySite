import { Injectable, Logger } from '@nestjs/common';
import Telegram from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private logger;
  constructor(private telegramApi: Telegram) {
    this.logger = new Logger();
  }

  async sendMessage() {
    try {
      await this.telegramApi.sendMessage(
        `-${process.env.id_telegram_chanel}`,
        'test_message',
        {},
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
}
