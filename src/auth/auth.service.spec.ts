import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { AuthService } from './auth.service';
import { UserRepository } from '../utils/repositories/user.repository';
import { TokensService } from '../utils/tokens/tokens.service';

jest.mock('argon2', () => {
  const module = jest.requireActual('argon2');

  return {
    __esModule: true,
    ...module,
  };
});

describe('auth service', () => {
  let authService: AuthService;

  const tokensServiceMock = jest.fn().mockReturnValue({
    generateTokens: jest.fn().mockReturnValue('generateTokens'),
  });

  const userRepositoryMock = jest.fn().mockReturnValue({
    findOne: jest.fn().mockReturnValue('findOne'),
    create: jest.fn().mockReturnValue('create'),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useFactory: userRepositoryMock,
        },
        {
          provide: TokensService,
          useFactory: tokensServiceMock,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('uniqUsername', async () => {
    const result = await authService.uniqUsername({ username: 'username' });

    expect(result).toBe('findOne');
  });

  it('signup', async () => {
    const result = await authService.signup({
      username: 'username',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(result).toBe('generateTokens');
  });

  it('login success', async () => {
    jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => new Promise((res) => res(true)));

    const result = await authService.login({
      username: 'username',
      password: 'password',
    });

    expect(result).toBe('generateTokens');
  });

  it('login error', async () => {
    jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => new Promise((res) => res(false)));

    const result = () =>
      authService.login({
        username: 'username',
        password: 'password',
      });

    await expect(result).rejects.toThrow(
      new HttpException('Логин или пароль некорректы', HttpStatus.FORBIDDEN),
    );
  });
});
