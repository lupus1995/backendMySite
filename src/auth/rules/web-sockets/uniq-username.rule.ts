import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AuthWebsocketsFindDataService } from 'src/auth/services/auth-web-sockets/auth-web-sockets-find-data.service';
@ValidatorConstraint({ name: 'uniq username', async: true })
@Injectable()
export class UniqUsernameRule implements ValidatorConstraintInterface {
  constructor(
    private authWebsocketsFindDataService: AuthWebsocketsFindDataService,
  ) {}
  async validate(value: string): Promise<boolean> {
    const user = await this.authWebsocketsFindDataService.findByUsername({
      username: value,
    });

    return user === null;
  }
  defaultMessage?(): string {
    return 'Пользователь с таким username уже существует';
  }
}
