import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenGuard } from './token.guard';
import { TokensService } from './tokens.service';

jest.mock('./tokens.service', () => {
  const module = jest.requireActual('./tokens.service');

  return {
    ...module,
    TokensService: jest.fn().mockImplementation(() => ({
      checkToken: ({ token }) => token === '1111111',
    })),
  };
});

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

const initData = () => {
  const jwt = new JwtService();
  const tokensService = new TokensService(jwt);
  return new TokenGuard(tokensService);
};

describe('TokenGuard', () => {
  it('check true', () => {
    const guard = initData();

    const context = new Context({
      headers: {
        authorization: '1111111',
      },
    });

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBeTruthy();
  });

  it('check false', () => {
    const guard = initData();

    const context = new Context({
      headers: {
        authorization: '11111112',
      },
    });

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBeFalsy();
  });
});
