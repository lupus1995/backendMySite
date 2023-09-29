import { Injectable, Logger } from '@nestjs/common';
import { AuthInterface } from './auth-interface';
import { AUTH_SERVICES } from './auth-enum';
import { AuthBlogService } from './services/auth-blog/auth-blog.service';
import { AuthWebSocketsService } from './services/auth-web-sockets/auth-web-sockets.service';

@Injectable()
export class AuthService implements AuthInterface {
  private services: { [key: string]: AuthInterface };
  constructor(
    private authBlogService: AuthBlogService,
    private authWebSocketsService: AuthWebSocketsService,
    private logger: Logger,
  ) {
    this.services = {
      [AUTH_SERVICES.BLOG]: authBlogService,
      [AUTH_SERVICES.WEB_SOCKETS]: authWebSocketsService,
    };
  }

  /**
   * поиск уникального пользователя по имени
   */
  async uniqUsername({
    username,
    type,
  }: {
    username: string;
    type: AUTH_SERVICES;
  }) {
    return this.services[type].uniqUsername({ username });
  }

  /**
   * регистрация нового пользователя
   */
  async signup({ user, type }: { user: unknown; type: AUTH_SERVICES }) {
    return await this.services[type].signup({ user });
  }

  /**
   * авторизация пользователя
   */
  async login({ login, type }: { login: unknown; type: AUTH_SERVICES }) {
    return await this.services[type].login(login);
  }
}
