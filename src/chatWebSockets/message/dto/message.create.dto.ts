import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { BaseMessageDto } from './base-message.dto';

export class MessageCreateDto extends BaseMessageDto {
  @ApiProperty({
    type: String,
    description: 'Картинка для типа сообщения image',
  })
  @IsOptional()
  // TODO сделать валидацию сообщения c файлом
  // @Validate(FileImageRule)
  image: string;
}
