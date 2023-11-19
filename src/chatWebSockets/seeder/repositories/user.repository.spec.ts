import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { connection, logger, model } from 'src/utils/repositories/mockData';
import { User } from 'src/utils/schemas/web-sockets/user.schema';

import { UserRepository } from './user.repository';

let userRepository: UserRepository;

describe('UserRepository', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepository,
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

    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('create', () => {
    expect(userRepository.create).toBeDefined();
  });
});
