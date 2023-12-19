import { Test } from '@nestjs/testing';

import { TokensService } from 'utils/tokens/tokens.service';

import { MessageService } from './message.service';
import { RoomsService } from './rooms.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

let controller: UserController;

const userServiceMock = jest.fn().mockReturnValue({
  findByUsername: jest.fn(),
  findInterlocutors: jest.fn(),
});

const roomsServiceMock = jest.fn().mockReturnValue({
  getRooms: jest.fn(),
});

const messageServiceMock = jest.fn().mockReturnValue({
  getMessages: jest.fn(),
});

const tokenServiceMock = jest.fn().mockReturnValue({
  getUserNameByToken: jest.fn(),
});

describe('UserController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: userServiceMock,
        },
        {
          provide: RoomsService,
          useFactory: roomsServiceMock,
        },
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

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => jest.clearAllMocks());

  it('getInterlocutor', () => expect(controller.getInterlocutor).toBeDefined());
  it('searchInterlocutors', () =>
    expect(controller.searchInterlocutors).toBeDefined());
  it('getDataUser', () => expect(controller.getDataUser).toBeDefined());
  it('getInterlocutor', () => expect(controller.getInterlocutor).toBeDefined());
});
