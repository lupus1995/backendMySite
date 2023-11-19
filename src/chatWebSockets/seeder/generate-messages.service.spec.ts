import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { logger } from 'utils/repositories/mockData';

import { GenerateMessageService } from './generate-messages.service';
import { MessageRepository } from './repositories/messages.repository';
import { RoomsRepository } from './repositories/rooms.repository';

let generateService: GenerateMessageService;

const messagesRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue([]),
});

const roomsRepositoryMock = jest.fn().mockResolvedValue({
  createRoom: jest.fn().mockResolvedValue('createRoom'),
});

describe('GenerateMessageService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GenerateMessageService,
        {
          provide: MessageRepository,
          useFactory: messagesRepositoryMock,
        },
        {
          provide: RoomsRepository,
          useFactory: roomsRepositoryMock,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    generateService = module.get<GenerateMessageService>(
      GenerateMessageService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('runGenerateMessages', () =>
    expect(generateService.runGenerateMessages).toBeDefined());
});
