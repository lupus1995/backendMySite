import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { connection, logger, model } from 'utils/repositories/mockData';
import { User } from 'utils/schemas/web-sockets/user.schema';

import { UserRuleRepository } from './user-rule.repository';

let userRuleRepository: UserRuleRepository;

describe('UserRuleRepository', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRuleRepository,
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

    userRuleRepository = module.get<UserRuleRepository>(UserRuleRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('findByEmail', () => expect(userRuleRepository.findByEmail).toBeDefined());
  it('findByUsername', () =>
    expect(userRuleRepository.findByUsername).toBeDefined());
});
