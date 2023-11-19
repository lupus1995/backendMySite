import { Test } from '@nestjs/testing';

import { UserBlogRepository } from 'auth/repositories/user-blog.repository';
import { SignUpBlogInterface } from 'src/auth/dto/sign-up-blog.dto';
import { ResponseService } from 'utils/response/response.service';
import { TokensService } from 'utils/tokens/tokens.service';

import { AuthBlogFindDataService } from './auth-blog-find-data.service';
import { AuthBlogValidateService } from './auth-blog-validate.service';
import { AuthBlogService } from './auth-blog.service';

let authBlogServiceMock: AuthBlogService;

const tokensServiceMock = jest.fn().mockReturnValue({
  generateTokens: jest.fn(),
});
const userRepositoryMock = jest.fn().mockReturnValue({
  create: jest.fn(),
});
const authValidateMock = jest.fn().mockReturnValue({
  validateSignup: jest.fn().mockResolvedValue([]),
  validateLogin: jest.fn().mockResolvedValue([]),
});
const responseServiseMock = jest.fn().mockResolvedValue({
  prepareResponse: jest.fn().mockReturnValue({
    errors: [],
    data: null,
    status: true,
  }),
});
const authFindData = jest.fn().mockReturnValue({
  uniqUsername: jest.fn().mockResolvedValue({ username: 'username' }),
});

jest.mock('argon2');

describe('AuthBlogService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthBlogService,
        {
          provide: TokensService,
          useFactory: tokensServiceMock,
        },
        {
          provide: UserBlogRepository,
          useFactory: userRepositoryMock,
        },
        {
          provide: AuthBlogValidateService,
          useFactory: authValidateMock,
        },
        {
          provide: ResponseService,
          useFactory: responseServiseMock,
        },
        {
          provide: AuthBlogFindDataService,
          useFactory: authFindData,
        },
      ],
    }).compile();

    authBlogServiceMock = module.get<AuthBlogService>(AuthBlogService);
  });
  it('check signup', async () => {
    const result = await authBlogServiceMock.signup({
      user: {} as unknown as SignUpBlogInterface,
    });

    expect(result.data).toBeNull();
    expect(Array.isArray(result.errors)).toBeTruthy();
    expect(typeof result.status === 'boolean').toBeTruthy();
  });
  it('check login', async () => {
    const result = await authBlogServiceMock.login({
      username: 'username',
      password: 'password',
    });

    expect(result.data).toBeNull();
    expect(Array.isArray(result.errors)).toBeTruthy();
    expect(typeof result.status === 'boolean').toBeTruthy();
  });
});
