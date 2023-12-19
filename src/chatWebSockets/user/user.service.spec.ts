import { Test } from '@nestjs/testing';

import { RegistrationDto } from './dto/registration.dto';
import { UserRuleRepository } from './repositories/user-rule.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

let userService: UserService;

const userRepositoryMock = jest.fn().mockReturnValue({
  findById: jest.fn().mockResolvedValue('findById'),
  create: jest.fn().mockResolvedValue('create'),
});

const userRuleRepositoryMock = jest.fn().mockReturnValue({
  findByEmail: jest.fn().mockResolvedValue('findByEmail'),
  findByUsername: jest.fn().mockResolvedValue('findByUsername'),
});

describe('UserService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: userRepositoryMock,
        },
        {
          provide: UserRuleRepository,
          useFactory: userRuleRepositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('findByEmail', async () => {
    const result = await userService.findByEmail({ email: '' });
    expect(userService.findByEmail).toBeDefined();
    expect(result).toBe('findByEmail');
  });
  it('findByUsername', async () => {
    const result = await userService.findByUsername({ username: '' });
    expect(userService.findByUsername).toBeDefined();
    expect(result).toBe('findByUsername');
  });
  it('findInterlocutors', () => {
    expect(userService.findByUsername).toBeDefined();
  });
  it('createUser', async () => {
    const result = await userService.createUser({
      data: {} as RegistrationDto,
    });
    expect(userService.createUser).toBeDefined();
    expect(result).toBe('create');
  });
  it('searchUsers', async () => {
    const result = await userService.searchUsers({
      users: [],
      search: '',
    });
    expect(userService.searchUsers).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('findById', async () => {
    const result = await userService.findById({ userId: '111' });

    expect(result).toBe('findById');
  });
});
