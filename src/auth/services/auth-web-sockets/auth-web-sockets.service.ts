import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { LoginWebSocket } from 'src/auth/dto/login-web-sockets.dto';
import { SignUpWebSocketsI } from 'src/auth/dto/sign-up-web-sockets.dto';
import { ResponseService } from 'src/utils/response/response.service';

import { AuthWebSocketsValidateService } from './auth-web-sockets-validate.service';
import { TokensService } from '../../../utils/tokens/tokens.service';
import { AuthInterface } from '../../auth-interface';
import { UserWebSocketsRepository } from '../../repositories/user-web-sockets.repository';

@Injectable()
export class AuthWebSocketsService implements AuthInterface {
  constructor(
    private readonly userRepository: UserWebSocketsRepository,
    private readonly tokensService: TokensService,
    private readonly authWebSocketsValidate: AuthWebSocketsValidateService,
    private readonly responseServise: ResponseService,
  ) {}
  // регистрация пользователя
  async signup({ user }: { user: SignUpWebSocketsI }) {
    const errors = await this.authWebSocketsValidate.validateSignup({ user });
    let data = null;

    if (errors.length === 0) {
      await this.userRepository.create({
        ...user,
        password: await argon2.hash(user.password),
        patronymic: '',
        avatar: '',
        listOfBlockedInterlocutors: [],
        listIOfDeletedDialogs: [],
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

  async login({ usernameOrEmail, password }: LoginWebSocket) {
    const errors = await this.authWebSocketsValidate.validateLogin({
      usernameOrEmail,
      password,
    });

    let data = null;

    if (errors.length === 0) {
      let user = await this.userRepository.findByEmail({
        email: usernameOrEmail,
      });
      if (!user) {
        user = await this.userRepository.findByUsername({
          username: usernameOrEmail,
        });
      }

      data = this.tokensService.generateTokens({
        username: user.username,
      });
    }

    return this.responseServise.prepareResponse({
      errors,
      data,
    });
  }
}
