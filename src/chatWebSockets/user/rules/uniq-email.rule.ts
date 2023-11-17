import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@ValidatorConstraint()
@Injectable()
export class UniqEmailRule implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.userService.findByEmail({ email: value });

    return !Boolean(user);
  }
  defaultMessage?(): string {
    return 'Пользователь с таким email уже существует';
  }
}
