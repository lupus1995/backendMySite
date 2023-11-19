import { AuthBlogFindDataService } from 'auth/services/auth-blog/auth-blog-find-data.service';

import { CustomLoginValidation } from './login.rule';

describe('login rule', () => {
  let rule;

  beforeEach(() => {
    rule = new CustomLoginValidation({
      uniqUsername: jest.fn(({ username }) => {
        if (username === 'username') {
          return true;
        }

        return false;
      }),
    } as unknown as AuthBlogFindDataService);
  });

  it('check rule true', async () => {
    expect(await rule.validate('username')).toBeTruthy();
  });
  it('check rule false', async () => {
    expect(await rule.validate('user')).toBeFalsy();
  });
});
