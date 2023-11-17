import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@ValidatorConstraint()
@Injectable()
export class UniqUsernameRule implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.userService.findByUsername({ username: value });

    return !Boolean(user);
  }
  defaultMessage?(): string {
    return 'Пользователь с таким username уже существует';
  }
}
