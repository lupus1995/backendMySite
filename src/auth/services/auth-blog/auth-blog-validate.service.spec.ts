import { Test } from '@nestjs/testing';
import * as classValidator from 'class-validator';

import * as login from 'auth/dto/login.dto';
import * as signUp from 'auth/dto/sign-up-blog.dto';

import { AuthBlogValidateService } from './auth-blog-validate.service';

let authBlogValidateService: AuthBlogValidateService;

describe('AuthBlogValidateService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthBlogValidateService],
    }).compile();

    authBlogValidateService = module.get<AuthBlogValidateService>(
      AuthBlogValidateService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('validateSignup', async () => {
    jest
      .spyOn(signUp, 'SignUpBlogDto')
      .mockReturnValue({} as signUp.SignUpBlogInterface);
    jest.spyOn(classValidator, 'validate').mockResolvedValue([]);

    const result = await authBlogValidateService.validateSignup({
      user: {} as signUp.SignUpBlogInterface,
    });
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('validateLogin', async () => {
    jest.spyOn(login, 'LoginDto').mockReturnValue({} as login.LoginInterface);
    jest.spyOn(classValidator, 'validate').mockResolvedValue([]);

    const result = await authBlogValidateService.validateLogin({
      username: 'username',
      password: 'password',
    });

    expect(Array.isArray(result)).toBeTruthy();
  });
});
