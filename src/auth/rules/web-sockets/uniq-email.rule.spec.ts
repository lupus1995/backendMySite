import { AuthWebsocketsFindDataService } from 'auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

import { UniqEmailRule } from './uniq-email.rule';

describe('UniqEmailRule', () => {
  it('check rule false', async () => {
    const rule = new UniqEmailRule({
      findByEmail: jest.fn().mockResolvedValue({}),
    } as unknown as AuthWebsocketsFindDataService);

    expect(await rule.validate('123123')).toBeFalsy();
  });
  it('check rule false', async () => {
    const rule = new UniqEmailRule({
      findByEmail: jest.fn().mockResolvedValue(null),
    } as unknown as AuthWebsocketsFindDataService);

    expect(await rule.validate('123123')).toBeTruthy();
  });
});
