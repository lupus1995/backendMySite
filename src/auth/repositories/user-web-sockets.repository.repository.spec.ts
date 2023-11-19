import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connection } from 'mongoose';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { logger, model } from 'utils/repositories/mockData';
import { User } from 'utils/schemas/web-sockets/user.schema';

import { UserWebSocketsRepository } from './user-web-sockets.repository';

describe('UserWebSocketsRepository', () => {
  let userWebSocketsRepository: UserWebSocketsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserWebSocketsRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_SOCKETS),
          useValue: connection,
        },
        {
          provide: getModelToken(User.name, MONGOOSE_LINK_SOCKETS),
          useFactory: model,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    userWebSocketsRepository = module.get<UserWebSocketsRepository>(
      UserWebSocketsRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create', () => {
    expect(userWebSocketsRepository.create).toBeDefined();
  });
  it('findByUsername', () => {
    expect(userWebSocketsRepository.findByUsername).toBeDefined();
  });
  it('findByEmail', () => {
    expect(userWebSocketsRepository.findByEmail).toBeDefined();
  });
});
