import { Logger } from '@nestjs/common';
import { Connection, Model } from 'mongoose';

import { CustomUsernameValidation } from './exists-username.rule';
import { UserBlogRepository } from '../../repositories/user-blog.repository';
import { AuthBlogValidateService } from '../../services/auth-blog/auth-blog-validate.service';

jest.mock('../../../utils/tokens/tokens.service');
jest.mock('../../repositories/user-blog.repository');

jest.mock('../../services/auth-blog/auth-blog-validate.service', () => {
  return {
    AuthBlogValidateService: jest.fn().mockImplementation(() => {
      return {
        uniqUsername: jest.fn(({ username }) => {
          if (username === 'username') {
            return true;
          }

          return false;
        }),
      };
    }),
  };
});

jest.mock('mongoose', () => {
  return {
    Model: jest.fn().mockImplementation(),
    Connection: jest.fn().mockImplementation(),
    Schema: jest.fn().mockImplementation(),
  };
});

describe('exist user rule', () => {
  it('rule validation true', async () => {
    const model = new Model();
    const connection = new Connection();
    const logger = new Logger();
    const userService = new UserBlogRepository(model, connection, logger);

    const authService = new AuthBlogValidateService(userService);
    const rule = new CustomUsernameValidation(authService);

    expect(await rule.validate('user')).toBe(true);
  });

  it('rule validation false', async () => {
    const model = new Model();
    const connection = new Connection();
    const logger = new Logger();
    const userService = new UserBlogRepository(model, connection, logger);

    const authService = new AuthBlogValidateService(userService);
    const rule = new CustomUsernameValidation(authService);

    expect(await rule.validate('username')).toBe(false);
  });
});
