import { UniqUsernameRule } from './uniq-username.rule';
import { UserService } from '../user.service';

describe('UniqUsernameRule', () => {
  it('check rule true', async () => {
    const rule = new UniqUsernameRule({
      findByUsername: jest.fn().mockResolvedValue(null),
    } as unknown as UserService);

    expect(await rule.validate('123')).toBeTruthy();
  });
  it('check rule false', async () => {
    const rule = new UniqUsernameRule({
      findByUsername: jest.fn().mockResolvedValue({}),
    } as unknown as UserService);

    expect(await rule.validate('123')).toBeFalsy();
  });
});
