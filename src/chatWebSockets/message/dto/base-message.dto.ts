import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

import { TYPE_MESSAGE } from '../enums/type-message';

export interface MessageInterface {
  from: string;
  to: string;
  typeMessage: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  isArchive: string;
  linkToImage: string;
  linkToAudio: string;
}

export class BaseMessageDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Отправитель',
  })
  from: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Получатель',
  })
  to: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Тип сообщения',
  })
  @IsEnum(TYPE_MESSAGE)
  typeMessage: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Значение сообщения',
  })
  value: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата создания сообщения',
  })
  createdAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата последнего редактирования сообщения',
  })
  updatedAt: string;
}
