import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Validate } from 'class-validator';
import { UniqUsernameRule } from '../rules/uniq-username.rule';
import { UniqEmailRule } from '../rules/uniq-email.rule';

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
