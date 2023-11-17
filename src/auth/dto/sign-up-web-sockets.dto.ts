import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate, IsEmail, MinLength } from 'class-validator';

import { UniqEmailRule } from '../rules/web-sockets/uniq-email.rule';
import { UniqUsernameRule } from '../rules/web-sockets/uniq-username.rule';

export interface SignUpWebSocketsI {
  lastname: string;
  firstname: string;
  password: string;
  username: string;
  email: string;
}

export class SignUpWebSocketsDto {
  constructor(signUp: SignUpWebSocketsI) {
    Object.assign(this, signUp);
  }

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Фамилия пользователя',
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Имя пользователя',
  })
  firstname: string;

  @IsString()
  @MinLength(12)
  @ApiProperty({
    type: String,
    description: 'Пароль',
  })
  password: string;

  @IsString()
  @Validate(UniqUsernameRule)
  @ApiProperty({
    type: String,
    description: 'Username пользователя',
  })
  username: string;

  @IsEmail()
  @Validate(UniqEmailRule)
  @ApiProperty({
    type: String,
    description: 'Email пользователя',
  })
  email: string;
}
