import { IsString, Validate } from 'class-validator';
import { UsernameOrEmailRule } from '../rules/web-sockets/username-or-email.rule';
import { PasswordRule } from '../rules/web-sockets/password.rule';

export interface LoginWebSocket {
  usernameOrEmail: string;
  password: string;
}

export class LoginWebsocketDto {
  constructor(login: LoginWebSocket) {
    Object.assign(this, login);
  }

  @IsString()
  @Validate(UsernameOrEmailRule)
  usernameOrEmail: string;

  @IsString()
  @Validate(PasswordRule)
  password: string;
}
