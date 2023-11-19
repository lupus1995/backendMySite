import { Logger } from '@nestjs/common';

import { AuthWebsocketsFindDataService } from 'auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

import { UsernameOrEmailRule } from './username-or-email.rule';

describe('username-or-email.rule', () => {
  let logger;
  beforeEach(() => {
    logger = {
      error: jest.fn(),
    } as unknown as Logger;
  });
  it('check rule true by username', async () => {
    const rule = new UsernameOrEmailRule(
      {
        findByUsername: jest.fn().mockResolvedValue(null),
        findByEmail: jest.fn().mockResolvedValue({}),
      } as unknown as AuthWebsocketsFindDataService,
      logger,
    );

    expect(await rule.validate('12312')).toBeTruthy();
  });
  it('check rule true by email', async () => {
    const rule = new UsernameOrEmailRule(
      {
        findByUsername: jest.fn().mockResolvedValue({}),
        findByEmail: jest.fn().mockResolvedValue(null),
      } as unknown as AuthWebsocketsFindDataService,
      logger,
    );

    expect(await rule.validate('12312')).toBeTruthy();
  });
  it('check rule true', async () => {
    const rule = new UsernameOrEmailRule(
      {
        findByUsername: jest.fn().mockResolvedValue({}),
        findByEmail: jest.fn().mockResolvedValue({}),
      } as unknown as AuthWebsocketsFindDataService,
      logger,
    );

    expect(await rule.validate('12312')).toBeTruthy();
  });

  it('check rule false', async () => {
    const rule = new UsernameOrEmailRule(
      {
        findByUsername: jest.fn().mockResolvedValue(null),
        findByEmail: jest.fn().mockResolvedValue(null),
      } as unknown as AuthWebsocketsFindDataService,
      logger,
    );

    expect(await rule.validate('12312')).toBeFalsy();
  });
});
