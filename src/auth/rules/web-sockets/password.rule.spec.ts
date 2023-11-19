import { Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import { ValidationArguments } from 'class-validator';

import { AuthWebsocketsFindDataService } from 'auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

import { PasswordRule } from './password.rule';

jest.mock('argon2');

describe('password rule', () => {
  it('check rule true by username', async () => {
    jest.spyOn(argon2, 'verify').mockResolvedValue(true);
    const rule = new PasswordRule(
      {
        findByUsername: jest.fn().mockResolvedValue({
          password: 'password',
        }),
        findByEmail: jest.fn().mockResolvedValue({}),
      } as unknown as AuthWebsocketsFindDataService,
      {
        error: jest.fn(),
      } as unknown as Logger,
    );

    expect(
      await rule.validate('value', {
        object: { usernameOrEmail: '' },
      } as ValidationArguments),
    ).toBeTruthy();
  });
  it('check rule false by username', async () => {
    jest.spyOn(argon2, 'verify').mockResolvedValue(false);
    const rule = new PasswordRule(
      {
        findByUsername: jest.fn().mockResolvedValue({
          password: 'null',
        }),
        findByEmail: jest.fn().mockResolvedValue({}),
      } as unknown as AuthWebsocketsFindDataService,
      {
        error: jest.fn(),
      } as unknown as Logger,
    );

    expect(
      await rule.validate('value', {
        object: { usernameOrEmail: '' },
      } as ValidationArguments),
    ).toBeFalsy();
  });

  it('check rule true by email', async () => {
    jest.spyOn(argon2, 'verify').mockResolvedValue(true);
    const rule = new PasswordRule(
      {
        findByUsername: jest.fn().mockResolvedValue({}),
        findByEmail: jest.fn().mockResolvedValue({
          password: 'password',
        }),
      } as unknown as AuthWebsocketsFindDataService,
      {
        error: jest.fn(),
      } as unknown as Logger,
    );

    expect(
      await rule.validate('value', {
        object: { usernameOrEmail: '' },
      } as ValidationArguments),
    ).toBeTruthy();
  });
  it('check rule false by email', async () => {
    jest.spyOn(argon2, 'verify').mockResolvedValue(false);
    const rule = new PasswordRule(
      {
        findByUsername: jest.fn().mockResolvedValue({}),
        findByEmail: jest.fn().mockResolvedValue({
          password: 'null',
        }),
      } as unknown as AuthWebsocketsFindDataService,
      {
        error: jest.fn(),
      } as unknown as Logger,
    );

    expect(
      await rule.validate('value', {
        object: { usernameOrEmail: '' },
      } as ValidationArguments),
    ).toBeFalsy();
  });
});
