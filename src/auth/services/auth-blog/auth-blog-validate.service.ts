import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

import { LoginDto, LoginInterface } from '../../dto/login.dto';
import { SignUpBlogInterface, SignUpBlogDto } from '../../dto/sign-up-blog.dto';
import { AuthValidate } from '../auth-validate.interface';

@Injectable()
export class AuthBlogValidateService extends AuthValidate {
  constructor() {
    super();
  }

  // валидация для регистрации нового пользователя
  async validateSignup({ user }: { user: SignUpBlogInterface }) {
    const validateUser = new SignUpBlogDto(user);
    const errors = await validate(validateUser);
    return errors;
  }

  // валидация авторизации пользователя
  async validateLogin({ username, password }: LoginInterface) {
    const loginValidate = new LoginDto({ username, password });
    const errors = await validate(loginValidate);
    return errors;
  }
}
