import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AuthBlogFindDataService } from 'src/auth/services/auth-blog/auth-blog-find-data.service';

@ValidatorConstraint({ name: 'usernameId', async: true })
@Injectable()
export class CustomUsernameValidation implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthBlogFindDataService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.authService.uniqUsername({ username: value });

    return !Boolean(user);
  }

  defaultMessage() {
    return `User already exist`;
  }
}
