import * as argon2 from 'argon2';

import { AuthBlogFindDataService } from 'auth/services/auth-blog/auth-blog-find-data.service';

import { PasswordRule } from './password.rule';

jest.mock('argon2');

describe('password rule', () => {
  let rule;

  beforeEach(() => {
    rule = new PasswordRule({
      uniqUsername: jest.fn().mockReturnValue({ password: 'password' }),
    } as unknown as AuthBlogFindDataService);
  });

  it('check rule true', () => {
    jest.spyOn(argon2, 'verify').mockResolvedValue(true);
    expect(
      rule.validate('password', { object: { username: 'username' } }),
    ).toBeTruthy();
  });
  it('check rule false', () => {
    jest.spyOn(argon2, 'verify').mockResolvedValue(true);
    expect(
      rule.validate('password', { object: { username: 'username' } }),
    ).toBeTruthy();
  });
});
