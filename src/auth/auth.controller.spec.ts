import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensService } from '../utils/tokens/tokens.service';

const tokens = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

const tokenServiceMock = jest.fn().mockReturnValue({
  checkToken: jest.fn().mockReturnValue(true),
  refreshTokens: jest.fn().mockReturnValue(tokens),
  checkAccessToken: jest.fn().mockReturnValue(tokens),
});

describe('AuthController', () => {
  let controller: AuthController;
  const loginData = {
    username: 'username',
    password: 'password',
  };

  const createUser = {
    ...loginData,
    confirmPassword: 'password',
  };

  beforeEach(async () => {
    const authServiceMock = jest.fn(() => ({
      uniqUsername: jest.fn().mockReturnValue(tokens),
      signup: jest.fn().mockReturnValue(tokens),
      login: jest.fn().mockReturnValue(tokens),
      checkToken: jest.fn().mockReturnValue(tokens),
      refreshTokens: jest.fn().mockReturnValue(tokens),
    }));

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: authServiceMock,
        },
        {
          provide: TokensService,
          useFactory: tokenServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('check signup', () => {
    expect(controller.signup(createUser)).toBe(tokens);
  });

  it('check login', () => {
    expect(controller.login(loginData)).toBe(tokens);
  });

  it('access', () => {
    expect(
      controller.checkAccessToken({ authorization: 'token' }),
    ).toBeTruthy();
  });

  it('check refresh', () =>
    expect(controller.refresh({ authorization: 'token' })).toStrictEqual(
      tokens,
    ));
});
