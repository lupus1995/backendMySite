import { IsArray, IsString } from 'class-validator';
import { RegistrationDto, RegistrationInterface } from './registration.dto';

export interface UserInterface extends RegistrationInterface {
  patronymic: string;
  avatar: string;
  listOfBlockedInterlocutors: string[];
  listIOfDeletedDialogs: string[];
}

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
