import { UniqEmailRule } from './uniq-email.rule';
import { UserService } from '../user.service';

describe('UniqEmailRule', () => {
  it('check rule true', async () => {
    const rule = new UniqEmailRule({
      findByEmail: jest.fn().mockResolvedValue(null),
    } as unknown as UserService);

    expect(await rule.validate('123')).toBeTruthy();
  });
  it('check rule false', async () => {
    const rule = new UniqEmailRule({
      findByEmail: jest.fn().mockResolvedValue({}),
    } as unknown as UserService);

    expect(await rule.validate('123')).toBeFalsy();
  });
});
