import { User } from '../../schemas/user.schema';
import { UserRepository } from './user.repository';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { connection, logger, model } from './mockData';
import { Logger } from '@nestjs/common';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getConnectionToken('Database'),
          useValue: connection,
        },
        {
          provide: getModelToken(User.name),
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
