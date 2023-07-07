import { JwtService } from '@nestjs/jwt';
import { Connection, Model } from 'mongoose';
import { AuthService } from '../auth.service';
import { CustomUsernameValidation } from './exists-username.rule';
import { TokensService } from '../../utils/tokens/tokens.service';
import { UserRepository } from '../../utils/repositories/user.repository';
import { Logger } from '@nestjs/common';

jest.mock('../../utils/tokens/tokens.service');
jest.mock('../../utils/repositories/user.repository');

jest.mock('../auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => {
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
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const logger = new Logger();
    const userService = new UserRepository(model, connection, logger);
    const tokenService = new TokensService(jwtService);

    const authService = new AuthService(tokenService, userService);
    const rule = new CustomUsernameValidation(authService);

    expect(await rule.validate('user')).toBe(true);
  });

  it('rule validation false', async () => {
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const logger = new Logger();
    const userService = new UserRepository(model, connection, logger);
    const tokenService = new TokensService(jwtService);

    const authService = new AuthService(tokenService, userService);
    const rule = new CustomUsernameValidation(authService);

    expect(await rule.validate('username')).toBe(false);
  });
});
