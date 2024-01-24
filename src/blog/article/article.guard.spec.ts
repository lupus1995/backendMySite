/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ExecutionContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { addDays, subDays } from 'date-fns';
import { Model, Connection } from 'mongoose';

import { TokensService } from '@utils/tokens/tokens.service';
import { ArticleRepository } from 'blog/utils/repositories/article.repository';

import { ArticleGuard } from './article.guard';

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

jest.mock('../utils/repositories/article.repository', () => {
  return {
    ArticleRepository: jest.fn().mockImplementation(() => {
      return { findById: jest.fn() };
    }),
  };
});

jest.mock('../../utils/tokens/tokens.service', () => {
  const module = jest.requireActual('../../utils/tokens/tokens.service');

  return {
    ...module,
    TokensService: jest.fn().mockImplementation(() => ({
      checkToken: jest.fn(),
    })),
  };
});

jest.mock('mongoose', () => {
  return {
    Model: jest.fn().mockImplementation(),
    Connection: jest.fn().mockImplementation(),
  };
});

type schemaType = 'artucleNull' | 'beforePublishedAt' | 'afterPublishedAt';

const initData = (schema: schemaType, isCorrectToken = false) => {
  const jwt = new JwtService();
  const model = new Model();
  const connection = new Connection();
  const tokensService = new TokensService(jwt);
  const logger = new Logger();
  const articleRepository = new ArticleRepository(model, connection, logger);
  switch (schema) {
    case 'beforePublishedAt': {
      // @ts-ignore
      articleRepository.findById.mockReturnValue({
        publishedAt: subDays(new Date(), 1),
      });
      break;
    }
    case 'afterPublishedAt': {
      // @ts-ignore
      articleRepository.findById.mockReturnValue({
        publishedAt: addDays(new Date(), 1),
      });
      // @ts-ignore
      tokensService.checkToken.mockReturnValue(isCorrectToken);
      break;
    }
    case 'artucleNull':
    default: {
      // @ts-ignore
      articleRepository.findById.mockReturnValue(null);
    }
  }

  return new ArticleGuard(tokensService, articleRepository);
};

describe('article guard', () => {
  it('check render article on artucleNull', async () => {
    const guard = initData('artucleNull');
    const context = new Context({
      headers: {},
    });
    const result = await guard.canActivate(
      context as unknown as ExecutionContext,
    );

    expect(result).toBeFalsy();
  });

  it('check render article on beforePublishedAt', async () => {
    const guard = initData('beforePublishedAt');
    const context = new Context({
      headers: {},
    });
    const result = await guard.canActivate(
      context as unknown as ExecutionContext,
    );

    expect(result).toBeTruthy();
  });

  it('check render article on afterPublishedAt, is true', async () => {
    const guard = initData('afterPublishedAt', true);
    const context = new Context({
      headers: {
        authorization: '1111111',
      },
    });
    const result = await guard.canActivate(
      context as unknown as ExecutionContext,
    );

    expect(result).toBeTruthy();
  });

  it('check render article on afterPublishedAt, is false', async () => {
    const guard = initData('afterPublishedAt', false);
    const context = new Context({
      headers: {
        authorization: '1111111',
      },
    });
    const result = await guard.canActivate(
      context as unknown as ExecutionContext,
    );

    expect(result).toBeFalsy();
  });
});
