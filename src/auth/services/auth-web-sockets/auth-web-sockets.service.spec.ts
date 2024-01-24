import { Test } from '@nestjs/testing';

import { ResponseService } from '@utils/response/response.service';
import { TokensService } from '@utils/tokens/tokens.service';
import { SignUpWebSocketsI } from 'auth/dto/sign-up-web-sockets.dto';
import { UserWebSocketsRepository } from 'auth/repositories/user-web-sockets.repository';

import { AuthWebSocketsValidateService } from './auth-web-sockets-validate.service';
import { AuthWebSocketsService } from './auth-web-sockets.service';

jest.mock('argon2');

let authWebSocketsService: AuthWebSocketsService;

const userRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn(),
  findByEmail: jest.fn().mockResolvedValue({}),
  findByUsername: jest.fn().mockResolvedValue({}),
});

const tokensServiceMock = jest.fn().mockReturnValue({
  generateTokens: jest.fn().mockReturnValue({
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  }),
});

const authWebSocketsValidateMock = jest.fn().mockReturnValue({
  validateSignup: jest.fn().mockResolvedValue([]),
  validateLogin: jest.fn().mockResolvedValue([]),
});

const responseServiseMock = jest.fn().mockReturnValue({
  prepareResponse: jest.fn().mockReturnValue({
    status: false,
    errors: [],
    data: null,
  }),
});

describe('AuthWebSocketsService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthWebSocketsService,
        {
          provide: UserWebSocketsRepository,
          useFactory: userRepositoryMock,
        },
        {
          provide: TokensService,
          useFactory: tokensServiceMock,
        },
        {
          provide: AuthWebSocketsValidateService,
          useFactory: authWebSocketsValidateMock,
        },
        {
          provide: ResponseService,
          useFactory: responseServiseMock,
        },
      ],
    }).compile();

    authWebSocketsService = module.get<AuthWebSocketsService>(
      AuthWebSocketsService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('signup', async () => {
    const result = await authWebSocketsService.signup({
      user: {} as SignUpWebSocketsI,
    });

    expect(authWebSocketsService.signup).toBeDefined();
    expect(Array.isArray(result.errors)).toBeTruthy();
    expect(result.data).toBeNull();
    expect(typeof result.status === 'boolean').toBeTruthy();
  });
  it('login', async () => {
    const result = await authWebSocketsService.login({
      usernameOrEmail: 'usernameOrEmail',
      password: 'password',
    });

    expect(authWebSocketsService.login).toBeDefined();
    expect(Array.isArray(result.errors)).toBeTruthy();
    expect(result.data).toBeNull();
    expect(typeof result.status === 'boolean').toBeTruthy();
  });
});
