import { Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { AuthWebsocketsFindDataService } from 'auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

@ValidatorConstraint({ name: 'check password websockets', async: true })
@Injectable()
export class PasswordRule implements ValidatorConstraintInterface {
  constructor(
    private authFindData: AuthWebsocketsFindDataService,
    private logger: Logger,
  ) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const username = await this.authFindData.findByUsername({
      username: validationArguments.object['usernameOrEmail'],
    });
    const email = await this.authFindData.findByEmail({
      email: validationArguments.object['usernameOrEmail'],
    });

    const password = username?.password || email?.password;

    if (!password) {
      this.logger.error('Пароль введен неверно');
      return false;
    }

    const result = await argon2.verify(password, value);

    if (!result) {
      this.logger.error('Пароль введен неверно');
      return false;
    }

    return result;
  }
  defaultMessage?(): string {
    return 'Email, username или пароль введены неверно!';
  }
}
