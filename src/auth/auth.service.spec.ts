import { Test } from '@nestjs/testing';

import { AUTH_SERVICES } from './auth-enum';
import { AuthService } from './auth.service';
import { AuthBlogService } from './services/auth-blog/auth-blog.service';
import { AuthWebSocketsService } from './services/auth-web-sockets/auth-web-sockets.service';

const authBlogServiceMock = jest.fn().mockReturnValue({
  signup: jest.fn().mockResolvedValue('signup'),
  login: jest.fn().mockResolvedValue('login'),
});

const authWebSocketsServiceMock = jest.fn().mockReturnValue({
  signup: jest.fn().mockResolvedValue('signup'),
  login: jest.fn().mockResolvedValue('login'),
});

describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthBlogService,
          useFactory: authBlogServiceMock,
        },
        {
          provide: AuthWebSocketsService,
          useFactory: authWebSocketsServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('signup', async () => {
    expect(authService.signup).toBeDefined();
    expect(
      await authService.signup({
        user: {} as unknown,
        type: AUTH_SERVICES.BLOG,
      }),
    ).toBe('signup');
  });

  it('login', async () => {
    expect(authService.login).toBeDefined();
    expect(
      await authService.login({
        login: {} as unknown,
        type: AUTH_SERVICES.BLOG,
      }),
    ).toBe('login');
  });
});
