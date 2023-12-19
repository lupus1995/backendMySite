import { Test } from '@nestjs/testing';

import { MessageService } from './message.service';
import { MessageRepository } from './repositories/message.repository';

let messageService: MessageService;
const messageRepositoryMock = jest.fn().mockReturnValue({
  getMessagesByRoomId: jest.fn().mockResolvedValue({
    createdAt: new Date(),
  }),
});

describe('MessageService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: MessageRepository,
          useFactory: messageRepositoryMock,
        },
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });

  afterEach(() => jest.clearAllMocks());

  it('getMessages', async () => {
    const result = await messageService.getMessages({
      roomsIds: ['room'],
      limit: 10,
      offset: 0,
    });

    expect(messageService.getMessages).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('getMessagesByRoomId', async () => {
    const result = await messageService.getMessagesByRoomId({ roomId: '1111' });

    expect(messageService.getMessagesByRoomId).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
  });
});
