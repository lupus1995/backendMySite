import { JwtService } from '@nestjs/jwt';
import { Model, Connection } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';
import { ArticleGuard } from './article.guard';
import { ArticleRepository } from './article.repository';

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

jest.mock('../article.repository', () => {
  return {
    AuthRepository: jest.fn().mockImplementation(() => {
      return { findById: jest.fn().mockResolvedValue({}) };
    }),
  };
});

jest.mock('../auth/auth.repository', () => {
  return {
    AuthRepository: jest.fn().mockImplementation(() => {
      return { findOne: jest.fn() };
    }),
  };
});

jest.mock('../auth/auth.service', () => {
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

describe('article guard', () => {
  let guard: ArticleGuard;

  beforeEach(() => {
    const jwtService = new JwtService();
    const model = new Model();
    const connection = new Connection();
    const authRepository = new AuthRepository(model, connection);

    const authService = new AuthService(jwtService, authRepository);
    const articleRepository = new ArticleRepository(model, connection);
    guard = new ArticleGuard(authService, articleRepository);
  });

  //   TODO написать сценарии тестов
});
