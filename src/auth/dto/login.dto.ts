import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';

import { CustomLoginValidation } from '../rules/blog/login.rule';

export interface LoginInterface {
  username: string;
  password: string;
}

export class LoginDto {
  constructor(login: LoginInterface) {
    Object.assign(this, login);
  }

  @IsString()
  @Validate(CustomLoginValidation)
  @ApiProperty({
    type: String,
    description: 'Имя пользователя',
  })
  username: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Пароль пользователя',
  })
  password: string;
}
