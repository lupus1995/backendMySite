import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBooleanString } from 'class-validator';
import { BaseMessageDto } from './base-message.dto';

export class MessageDto extends BaseMessageDto {
  @IsBooleanString()
  @ApiProperty({
    type: Boolean,
    description: 'Находится ли сообщение в архиве',
  })
  isArchive: boolean;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Путь к сообщению',
  })
  linkToImage: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Путь к аудио сообщению',
  })
  linkToAudio: string;
}
