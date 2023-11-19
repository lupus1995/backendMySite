import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { connection, logger, model } from 'utils/repositories/mockData';
import { Message } from 'utils/schemas/web-sockets/message.schema';

import { MessageRepository } from './message.repository';

let messageRepository: MessageRepository;

describe('MessageRepository', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MessageRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_SOCKETS),
          useValue: connection,
        },
        {
          provide: getModelToken(Message.name, MONGOOSE_LINK_SOCKETS),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    messageRepository = module.get<MessageRepository>(MessageRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('getMessagesByRoomId', () =>
    expect(messageRepository.getMessagesByRoomId).toBeDefined());
});
