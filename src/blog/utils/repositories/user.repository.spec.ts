import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { connection, logger, model } from '@utils/repositories/mockData';
import { User } from '@utils/schemas/blog/user.schema';
import { MONGOOSE_LINK_NEST } from 'src/constants';

import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getConnectionToken(MONGOOSE_LINK_NEST),
          useValue: connection,
        },
        {
          provide: getModelToken(User.name, MONGOOSE_LINK_NEST),
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

  it('create', () => {
    expect(userRepository.create).toBeDefined();
  });

  it('findOne', async () => {
    expect(await userRepository.findOne('user')).toBe('findOne');
  });
});
