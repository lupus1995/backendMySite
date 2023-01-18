import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AuthService } from './auth.service';

@ValidatorConstraint({ name: 'usernameId', async: true })
@Injectable()
export class CustomUsernameValidation implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.authService.uniqUsername({ username: value });

    return !Boolean(user);
  }

  defaultMessage() {
    return `User already exist`;
  }
}
