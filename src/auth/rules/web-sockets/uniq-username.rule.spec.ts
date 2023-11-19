import { AuthWebsocketsFindDataService } from 'auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

import { UniqUsernameRule } from './uniq-username.rule';

describe('UniqUsernameRule', () => {
  it('check rule is true', async () => {
    const rule = new UniqUsernameRule({
      findByUsername: jest.fn().mockResolvedValue(null),
    } as unknown as AuthWebsocketsFindDataService);

    expect(await rule.validate('123123')).toBeTruthy();
  });
  it('check rule is false', async () => {
    const rule = new UniqUsernameRule({
      findByUsername: jest.fn().mockResolvedValue({}),
    } as unknown as AuthWebsocketsFindDataService);

    expect(await rule.validate('123123')).toBeFalsy();
  });
});
