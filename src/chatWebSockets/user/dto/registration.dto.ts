import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';

import { UniqEmailRule } from '../rules/uniq-email.rule';
import { UniqUsernameRule } from '../rules/uniq-username.rule';

export interface RegistrationInterface {
  lastname: string;
  firstname: string;
  password: string;
  username: string;
  email: string;
}

export class RegistrationDto {
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
