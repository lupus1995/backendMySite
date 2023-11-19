import { AuthBlogFindDataService } from 'auth/services/auth-blog/auth-blog-find-data.service';

import { CustomUsernameValidation } from './exists-username.rule';

describe('exist user rule', () => {
  let rule;

  beforeEach(() => {
    rule = new CustomUsernameValidation({
      uniqUsername: jest.fn(({ username }) => {
        if (username === 'user') {
          return true;
        }

        return false;
      }),
    } as unknown as AuthBlogFindDataService);
  });
  it('rule validation true', async () => {
    expect(await rule.validate('username')).toBe(true);
  });

  it('rule validation false', async () => {
    expect(await rule.validate('user')).toBe(false);
  });
});
