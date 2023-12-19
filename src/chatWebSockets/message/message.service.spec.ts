import { Test } from '@nestjs/testing';

import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';
import { TYPE_MESSAGE } from './enums/type-message';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  const messageRepositoryMock = jest.fn().mockReturnValue({
    getAll: jest.fn().mockResolvedValue(['getAll']),
    create: jest.fn().mockResolvedValue('create'),
    update: jest.fn().mockResolvedValue('update'),
    getMessagesByFromAndTo: jest.fn().mockResolvedValue([]),
    delete: jest.fn().mockResolvedValue('delete'),
  });

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
      roomId: '123123',
      limit: 10,
      offset: 0,
    });

    expect(messageService.getMessages).toBeDefined();
    expect(result).toStrictEqual(['getAll']);
  });
  it('createMessage', async () => {
    const result = await messageService.createMessage({} as MessageCreateDto);

    expect(messageService.createMessage).toBeDefined();
    expect(result).toBe('create');
  });
  it('updateMessage', async () => {
    const result = await messageService.updateMessage({
      data: {} as MessageDto,
      id: 'id',
    });

    expect(messageService.updateMessage).toBeDefined();
    expect(result).toBe('update');
  });
  it('deleteMessage', async () => {
    const result = await messageService.deleteMessage({
      to: 'to',
      from: 'from',
    });

    expect(messageService.deleteMessage).toBeDefined();
    expect(result).toBe('delete');
  });

  it('getTypesMessage', () => {
    const result = messageService.getTypesMessage();
    expect(result).toEqual(TYPE_MESSAGE);
  });
});
