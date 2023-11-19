import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { logger } from 'src/utils/repositories/mockData';

import { GenarateUserService } from './generate-user.service';
import { UserRepository } from './repositories/user.repository';

let genarateUserService: GenarateUserService;
const userRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue([]),
});

describe('GenarateUserService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GenarateUserService,
        {
          provide: UserRepository,
          useFactory: userRepositoryMock,
        },
        {
          provide: Logger,
          useValue: logger,
        },
      ],
    }).compile();

    genarateUserService = module.get<GenarateUserService>(GenarateUserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('generateUsers', () =>
    expect(genarateUserService.generateUsers).toBeDefined());
});
