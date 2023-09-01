import { Injectable, Logger } from '@nestjs/common';
import Telegram from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  constructor(private telegramApi: Telegram, private logger: Logger) {}

  async sendMessage({ message }: { message: string }) {
    try {
      return await this.telegramApi.sendMessage(
        `-${process.env.id_telegram_chanel}`,
        message,
        {},
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
}
