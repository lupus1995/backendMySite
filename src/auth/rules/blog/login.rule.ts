import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AuthBlogValidateService } from '../../services/auth-blog/auth-blog-validate.service';

@ValidatorConstraint({ name: 'login', async: true })
@Injectable()
export class CustomLoginValidation implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthBlogValidateService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.authService.uniqUsername({ username: value });

    return user !== null && Boolean(user);
  }

  defaultMessage() {
    return `Пользователя в базе данных нет, зарегистрируйтесь`;
  }
}
