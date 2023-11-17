import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { AuthWebsocketsFindDataService } from 'src/auth/services/auth-web-sockets/auth-web-sockets-find-data.service';

@ValidatorConstraint({ name: 'websockets uniq email', async: true })
@Injectable()
export class UniqEmailRule implements ValidatorConstraintInterface {
  constructor(private authFindData: AuthWebsocketsFindDataService) {}
  async validate(value: string): Promise<boolean> {
    const user = await this.authFindData.findByEmail({ email: value });

    return user === null;

    return false;
  }
  defaultMessage?(): string {
    return 'Пользователь с таким email уже существует';
  }
}
