import { Test } from '@nestjs/testing';

import { TokensService } from 'utils/tokens/tokens.service';

import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';
import { TYPE_MESSAGE } from './enums/type-message';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

let messageController: MessageController;

const messageServiceMock = jest.fn().mockReturnValue({
  getMessages: jest.fn().mockReturnValue('getMessages'),
  createMessage: jest.fn().mockReturnValue('createMessage'),
  updateMessage: jest.fn().mockReturnValue('updateMessage'),
  deleteMessage: jest.fn().mockReturnValue('deleteMessages'),
  getTypesMessage: jest.fn().mockReturnValue(TYPE_MESSAGE),
});

const tokenServiceMock = jest.fn().mockReturnValue({
  getUserNameByToken: jest.fn(),
});

describe('MessageController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useFactory: messageServiceMock,
        },
        {
          provide: TokensService,
          useFactory: tokenServiceMock,
        },
      ],
    }).compile();

    messageController = module.get<MessageController>(MessageController);
  });
  afterEach(() => jest.clearAllMocks());

  it('getMessages', async () => {
    const result = await messageController.getMessages('123', {
      limit: 10,
      offset: 0,
    });

    expect(messageController.getMessages).toBeDefined();
    expect(result).toBe('getMessages');
  });
  it('getTypesMessage', () => {
    const result = messageController.getTypesMessage();

    expect(result).toStrictEqual(TYPE_MESSAGE);
  });
  it('createMessage', async () => {
    const result = await messageController.createMessage(
      {} as MessageCreateDto,
    );
    expect(messageController.createMessage).toBeDefined();
    expect(result).toBe('createMessage');
  });
  it('updateMessage', async () => {
    const result = await messageController.updateMessage(
      {} as MessageDto,
      '111',
    );
    expect(messageController.updateMessage).toBeDefined();
    expect(result).toBe('updateMessage');
  });
  it('deleteMessages', async () => {
    const result = await messageController.deleteMessages('111', '222');
    expect(messageController.deleteMessages).toBeDefined();
    expect(result).toBe('deleteMessages');
  });
});
