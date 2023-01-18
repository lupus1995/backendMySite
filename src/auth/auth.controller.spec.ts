import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const loginData = {
    username: 'username',
    password: 'password',
  };

  const tokens = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  const createUser = {
    ...loginData,
    confirmPassword: 'password',
  };

  const user = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    password: 'password',
  };

  beforeEach(async () => {
    const authServiceMock = jest.fn(() => ({
      uniqUsername: jest.fn(() => user),
      signup: jest.fn(() => tokens),
      login: jest.fn(() => tokens),
      refreshTokens: jest.fn(() => tokens),
    }));

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: authServiceMock,
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

  it('check refresh', () =>
    expect(controller.refresh({ authorization: 'token' })).toBe(tokens));
});
