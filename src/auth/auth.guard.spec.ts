import { JwtService } from '@nestjs/jwt';
import { Model, Connection } from 'mongoose';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthGuard } from '../utils/tokens/token.guard';
import { ExecutionContext } from '@nestjs/common';

class Context {
  private headers;
  constructor(headers) {
    this.headers = headers;
  }
  public switchToHttp() {
    return this;
  }

  public getRequest() {
    return this.headers;
  }
}

jest.mock('./auth.repository', () => {
  return {
    AuthRepository: jest.fn().mockImplementation(() => {
      return { findOne: jest.fn() };
    }),
  };
});

jest.mock('./auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => {
      return {
        uniqUsername: jest.fn(({ username }) => {
          return username;
        }),
        checkToken: jest.fn(({ token }) => {
          return token === 'token';
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

describe('auth guard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    const jwtService = new JwtService();
    const model = new Model();
    const connection = new Connection();
    const authRepository = new AuthRepository(model, connection);

    const authService = new AuthService(jwtService, authRepository);
    guard = new AuthGuard(authService);
  });

  it('check get token error by empty headers', () => {
    const context = new Context({
      headers: {},
    });
    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBe(false);
  });

  it('check token by error name error value autorization headers', () => {
    const context = new Context({
      headers: {
        authorization: ['sdfs'],
      },
    });

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBe(false);
  });

  it('check expired token', () => {
    const context = new Context({
      headers: {
        authorization: 'token22',
      },
    });

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBe(false);
  });

  it('check correct token', () => {
    const context = new Context({
      headers: {
        authorization: 'token',
      },
    });

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBe(true);
  });
});
