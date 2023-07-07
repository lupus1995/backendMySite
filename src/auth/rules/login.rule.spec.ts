import { JwtService } from '@nestjs/jwt';
import { Connection, Model } from 'mongoose';
import { AuthService } from '../auth.service';
import { CustomLoginValidation } from './login.rule';
import { UserRepository } from '../../utils/repositories/user.repository';
import { TokensService } from '../../utils/tokens/tokens.service';
import { Logger } from '@nestjs/common';

jest.mock('../../utils/repositories/user.repository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => {
      return { findOne: jest.fn() };
    }),
  };
});

jest.mock('../auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => {
      return {
        uniqUsername: jest.fn(({ username }) => {
          return username;
        }),
      };
    }),
  };
});

jest.mock('mongoose', () => {
  return {
    Model: jest.fn().mockImplementation(),
    Connection: jest.fn().mockImplementation(),
  };
});

describe('login rule', () => {
  let rule: CustomLoginValidation;

  beforeEach(() => {
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const logger = new Logger();
    const userRepository = new UserRepository(model, connection, logger);
    const tokensService = new TokensService(jwtService);

    const authService = new AuthService(tokensService, userRepository);
    rule = new CustomLoginValidation(authService);
  });

  it('rule validation true', async () => {
    expect(await rule.validate('user')).toBe(true);
  });

  it('rule validation false', async () => {
    expect(await rule.validate(null)).toBe(false);
  });
});
