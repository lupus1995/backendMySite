import { Test } from '@nestjs/testing';

import { TokensService } from 'src/utils/tokens/tokens.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const authServiceMock = jest.fn().mockReturnValue({
  signup: jest.fn().mockResolvedValue({
    status: 200,
  }),
  login: jest.fn().mockResolvedValue({
    status: 200,
  }),
});

const tokensServiceMock = jest.fn().mockReturnValue({
  checkToken: jest.fn().mockReturnValue(false),
  refreshTokens: jest.fn().mockReturnValue('refreshTokens'),
});

let controller: AuthController;
describe('AuthController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: authServiceMock,
        },
        {
          provide: TokensService,
          useFactory: tokensServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => jest.clearAllMocks());

  it('signup', () => {
    expect(controller.signup).toBeDefined();
  });
  it('login', () => {
    expect(controller.login).toBeDefined();
  });
  it('checkAccessToken', () => {
    expect(controller.checkAccessToken).toBeDefined();
  });
  it('refresh', () => {
    expect(controller.refresh).toBeDefined();
  });
});
