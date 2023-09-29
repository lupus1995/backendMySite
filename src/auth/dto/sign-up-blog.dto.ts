import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Validate } from 'class-validator';
import { CustomUsernameValidation } from '../rules/blog/exists-username.rule';
import { CustomConfirmPasswordValidation } from '../rules/blog/confirm-password.rule';

export interface SignUpBlogInterface {
  username: string;
  password: string;
  confirmPassword: string;
}

export class SignUpBlogDto {
  constructor(signUp: SignUpBlogInterface) {
    Object.assign(this, signUp);
  }

  @IsString()
  @Validate(CustomUsernameValidation)
  @ApiProperty({
    type: String,
    description: 'Имя пользователя',
  })
  username: string;

  @IsString()
  @MinLength(12)
  @ApiProperty({
    type: String,
    description: 'Пароль пользователя',
  })
  password: string;

  @IsString()
  @Validate(CustomConfirmPasswordValidation)
  @ApiProperty({
    type: String,
    description: 'Поле для повторного пароля пользователя',
  })
  confirmPassword: string;
}
