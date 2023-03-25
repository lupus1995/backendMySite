import { Module, Provider } from '@nestjs/common';
import Telegram from 'node-telegram-bot-api';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService],
})
export class TelegramModule {
  static forRoot() {
    const TelegramProvider: Provider = {
      provide: TelegramService,
      useFactory: () => {
        const telegram = new Telegram(process.env.telegramToken);

        return new TelegramService(telegram);
      },
    };

    return {
      module: TelegramModule,
      providers: [TelegramProvider],
      exports: [TelegramProvider],
      global: false,
    };
  }
}
