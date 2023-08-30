import { IsArray, IsString } from 'class-validator';
import { RegistrationDto } from './registration.dto';

export class UserDto extends RegistrationDto {
  @IsString()
  patronymic: string;

  @IsString()
  avatar: string;

  @IsArray()
  @IsString({ each: true })
  listOfBlockedInterlocutors: string[];

  @IsArray()
  @IsString({ each: true })
  listIOfDeletedDialogs: string[];
}
