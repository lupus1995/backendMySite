import { JwtService } from '@nestjs/jwt';
import { Connection, Model } from 'mongoose';
import { AuthRepository } from '../auth.repository';
import { AuthService } from '../auth.service';
import { CustomLoginValidation } from './login.rule';

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
  it('rule validation true', async () => {
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const authRepository = new AuthRepository(model, connection);

    const authService = new AuthService(jwtService, authRepository);
    const rule = new CustomLoginValidation(authService);

    expect(await rule.validate('user')).toBe(true);
  });

  it('rule validation false', async () => {
    const jwtService = new JwtService();

    const model = new Model();
    const connection = new Connection();
    const authRepository = new AuthRepository(model, connection);

    const authService = new AuthService(jwtService, authRepository);
    const rule = new CustomLoginValidation(authService);

    expect(await rule.validate(null)).toBe(false);
  });
});
