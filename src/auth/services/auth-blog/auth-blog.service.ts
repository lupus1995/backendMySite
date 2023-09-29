import { Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import { TokensService } from '../../../utils/tokens/tokens.service';
import { AuthBlogValidateService } from './auth-blog-validate.service';
import { AuthInterface } from '../../auth-interface';
import { SignUpBlogInterface } from '../../dto/sign-up-blog.dto';
import { UserBlogRepository } from '../../repositories/user-blog.repository';
import { ResponseService } from 'src/utils/response/response.service';

@Injectable()
export class AuthBlogService implements AuthInterface {
  constructor(
    private readonly tokensService: TokensService,
    private readonly userRepository: UserBlogRepository,
    private readonly authValidate: AuthBlogValidateService,
    private readonly logger: Logger,
    private readonly responseServise: ResponseService,
  ) {}

  /**
   * поиск уникального пользователя по имени
   */
  public async uniqUsername({ username }: { username: string }) {
    return await this.userRepository.findOne(username);
  }

  /**
   * регистрация пользователя
   */
  public async signup({ user }: { user: SignUpBlogInterface }) {
    const errors = this.authValidate.validateSignup({ user });

    let data = null;

    if (errors.length === 0) {
      await this.userRepository.create({
        ...user,
        password: await argon2.hash(user.password),
      });

      data = this.tokensService.generateTokens({
        username: user.username,
      });
    }

    return this.responseServise.prepareResponse({
      errors,
      data,
      isPost: true,
    });
  }

  /**
   * авторизация пользователя
   */
  public async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const errors = this.authValidate.validateLogin({ username, password });
    if (errors.length === 0) {
      const user = await this.uniqUsername({ username });
      const tokens = this.tokensService.generateTokens({
        username: user.username,
      });

      return this.responseServise.prepareResponse({
        errors: [],
        data: tokens,
        isPost: false,
      });
    }

    return this.responseServise.prepareResponse({
      errors: errors,
      data: null,
      isPost: false,
    });
  }
}
