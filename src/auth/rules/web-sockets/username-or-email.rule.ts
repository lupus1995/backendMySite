import { Injectable, Logger } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { AuthWebsocketsFindDataService } from 'src/auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

@ValidatorConstraint({ name: 'username or email', async: true })
@Injectable()
export class UsernameOrEmailRule implements ValidatorConstraintInterface {
  constructor(
    private authFindData: AuthWebsocketsFindDataService,
    private logger: Logger,
  ) {}
  async validate(value: string): Promise<boolean> {
    const username = await this.authFindData.findByUsername({
      username: value,
    });
    const email = await this.authFindData.findByEmail({ email: value });

    const hasError = !username && !email;

    if (hasError) {
      this.logger.error('Email или username введены неверно');
      return false;
    }

    return !hasError;
  }
  defaultMessage?(): string {
    return 'Email, username или пароль введены неверно!';
  }
}
