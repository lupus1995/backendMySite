import { CustomConfirmPasswordValidation } from './confirm-password.rule';

describe('confirm password rule', () => {
  let rule: CustomConfirmPasswordValidation;

  beforeEach(() => {
    rule = new CustomConfirmPasswordValidation();
  });

  it('check rule access', async () => {
    const result = await rule.validate('1234', {
      object: {
        password: '1234',
      },
      value: undefined,
      constraints: [],
      targetName: '',
      property: '',
    });

    expect(result).toBeTruthy();
  });

  it('check rule error', async () => {
    const result = await rule.validate('1234', {
      object: {
        password: '12345',
      },
      value: undefined,
      constraints: [],
      targetName: '',
      property: '',
    });

    expect(result).toBe(false);
  });
});
