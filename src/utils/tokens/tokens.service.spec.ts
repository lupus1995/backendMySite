import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let tokensService: TokensService;

  const jwtService = jest.fn().mockReturnValue({
    sign: jest.fn().mockReturnValue('sign'),
    verify: jest.fn().mockReturnThis(),
    sub: 'username',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensService,

        {
          provide: JwtService,
          useFactory: jwtService,
        },
      ],
    }).compile();

    tokensService = module.get<TokensService>(TokensService);
  });

  it('generateTokens', () => {
    expect(
      tokensService.generateTokens({ username: 'username' }),
    ).toStrictEqual({ accessToken: 'sign', refreshToken: 'sign' });
  });

  it('refreshTokens', async () => {
    expect(await tokensService.refreshTokens({ token: 'token' })).toStrictEqual(
      {
        accessToken: 'sign',
        refreshToken: 'sign',
      },
    );
  });

  it('checkToken', () => {
    expect(tokensService.checkToken({ token: 'token' })).toBeTruthy();
  });
});
