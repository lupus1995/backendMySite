import { Test } from '@nestjs/testing';

import { UserWebSocketsRepository } from 'auth/repositories/user-web-sockets.repository';

import { AuthWebsocketsFindDataService } from './auth-web-sockets-find-data.service';

const userRepositoryMock = jest.fn().mockReturnValue({
  findByUsername: jest.fn().mockResolvedValue('findByUsername'),
  findByEmail: jest.fn().mockResolvedValue('findByEmail'),
});

describe('AuthWebsocketsFindDataService', () => {
  let authWebsocketsFindDataService: AuthWebsocketsFindDataService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthWebsocketsFindDataService,
        {
          provide: UserWebSocketsRepository,
          useFactory: userRepositoryMock,
        },
      ],
    }).compile();

    authWebsocketsFindDataService = module.get<AuthWebsocketsFindDataService>(
      AuthWebsocketsFindDataService,
    );
  });

  it('findByUsername', async () => {
    expect(authWebsocketsFindDataService.findByUsername).toBeDefined();
    expect(
      await authWebsocketsFindDataService.findByUsername({
        username: 'username',
      }),
    ).toBe('findByUsername');
  });
  it('findByEmail', async () => {
    expect(authWebsocketsFindDataService.findByEmail).toBeDefined();
    expect(
      await authWebsocketsFindDataService.findByEmail({ email: 'email' }),
    ).toBe('findByEmail');
  });
});
