import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { SignUpBlogInterface, SignUpBlogDto } from '../../dto/sign-up-blog.dto';
import { LoginDto, LoginInterface } from '../../dto/login.dto';
import { UserBlogRepository } from '../../repositories/user-blog.repository';
import { AuthValidate } from '../auth-validate.interface';

@Injectable()
export class AuthBlogValidateService extends AuthValidate {
  constructor(private userRepository: UserBlogRepository) {
    super();
  }

  /**
   * поиск уникального пользователя по имени
   */
  public async uniqUsername({ username }: { username: string }) {
    return await this.userRepository.findOne(username);
  }

  // валидация для регистрации нового пользователя
  validateSignup({ user }: { user: SignUpBlogInterface }) {
    const validateUser = new SignUpBlogDto(user);
    const errors = validateSync(validateUser);
    return errors;
  }

  // валидация авторизации пользователя
  validateLogin({ username, password }: LoginInterface) {
    const loginValidate = new LoginDto({ username, password });
    const errors = validateSync(loginValidate);
    return errors;
  }
}
