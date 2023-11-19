import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import Telegram from 'node-telegram-bot-api';

import { TelegramService } from './telegram.service';

describe('TelegramService', () => {
  let telegramService: TelegramService;

  const telegram = jest.fn().mockReturnValue({
    sendMessage: jest.fn().mockReturnValue('sendMessage'),
  });

  const logger = jest.fn().mockReturnValue({
    error: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelegramService,

        {
          provide: Telegram,
          useFactory: telegram,
        },
        {
          provide: Logger,
          useFactory: logger,
        },
      ],
    }).compile();

    telegramService = module.get<TelegramService>(TelegramService);
  });

  it('sendMessage', async () => {
    expect(await telegramService.sendMessage({ message: 'message' })).toBe(
      'sendMessage',
    );
  });
});
