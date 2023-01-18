import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { CustomLoginValidation } from '../login.rule';

export class LoginDto {
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
