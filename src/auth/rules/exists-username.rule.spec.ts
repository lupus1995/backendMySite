import { JwtService } from '@nestjs/jwt';
import { Connection, Model } from 'mongoose';
import { AuthRepository } from '../auth.repository';
import { AuthService } from '../auth.service';
import { CustomUsernameValidation } from './exists-username.rule';

jest.mock('../auth.repository', () => {
  return {
    AuthRepository: jest.fn().mockImplementation(() => {
      return { findOne: jest.fn() };
    }),
  };
});

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
  };
});

describe('exist user rule', () => {
  it('rule validation true', async () => {
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const authRepository = new AuthRepository(model, connection);

    const authService = new AuthService(jwtService, authRepository);
    const rule = new CustomUsernameValidation(authService);

    expect(await rule.validate('user')).toBe(true);
  });

  it('rule validation false', async () => {
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const authRepository = new AuthRepository(model, connection);

    const authService = new AuthService(jwtService, authRepository);
    const rule = new CustomUsernameValidation(authService);

    expect(await rule.validate('username')).toBe(false);
  });
});
