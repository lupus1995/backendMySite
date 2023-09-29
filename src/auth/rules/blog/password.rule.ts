import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as argon2 from 'argon2';
import { AuthBlogService } from 'src/auth/services/auth-blog/auth-blog.service';

@ValidatorConstraint({ name: 'passwod', async: true })
@Injectable()
export class PasswordRule implements ValidatorConstraintInterface {
  constructor(protected readonly authBlogService: AuthBlogService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.authBlogService.uniqUsername({
      username: validationArguments.object['username'],
    });

    const result = await argon2.verify(user?.password, value);

    return result;
  }
  defaultMessage?(): string {
    return 'Логин или пароль не верны';
  }
}
