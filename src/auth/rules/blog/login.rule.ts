import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { AuthBlogFindDataService } from 'src/auth/services/auth-blog/auth-blog-find-data.service';

@ValidatorConstraint({ name: 'login', async: true })
@Injectable()
export class CustomLoginValidation implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthBlogFindDataService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.authService.uniqUsername({ username: value });

    return user !== null && Boolean(user);
  }

  defaultMessage() {
    return `Пользователя в базе данных нет, зарегистрируйтесь`;
  }
}
