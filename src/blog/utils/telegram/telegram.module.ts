import { Logger, Module, Provider } from '@nestjs/common';
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
        const logger = new Logger();

        return new TelegramService(telegram, logger);
      },
    };

    return {
      module: TelegramModule,
      providers: [TelegramProvider, Logger],
      exports: [TelegramProvider],
      global: false,
    };
  }
}
