import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { CustomConfirmPasswordValidation } from '../rules/confirm-password.rule';
import { CustomUsernameValidation } from '../rules/exists-username.rule';

export class SignUpDto {
  @IsString()
  @Validate(CustomUsernameValidation)
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

  @IsString()
  @Validate(CustomConfirmPasswordValidation)
  @ApiProperty({
    type: String,
    description: 'Поле для повторного пароля пользователя',
  })
  confirmPassword: string;
}
