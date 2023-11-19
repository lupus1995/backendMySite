import { Logger } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { MONGOOSE_LINK_NEST } from 'src/constants';
import { User } from 'src/utils/schemas/blog/user.schema';
import { connection, model, logger } from 'utils/repositories/mockData';

import { UserBlogRepository } from './user-blog.repository';

describe('UserBlogRepository', () => {
  let userBlogRepository: UserBlogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBlogRepository,
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

    userBlogRepository = module.get<UserBlogRepository>(UserBlogRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findOne', () => {
    expect(userBlogRepository.findOne).toBeDefined();
  });
  it('create', () => {
    expect(userBlogRepository.create).toBeDefined();
  });
});
