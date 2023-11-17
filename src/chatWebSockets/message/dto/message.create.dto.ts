import { ApiProperty } from '@nestjs/swagger';

import { BaseMessageDto } from './base-message.dto';

export class MessageCreateDto extends BaseMessageDto {
  @ApiProperty({
    type: String,
    description: 'Картинка для типа сообщения image',
  })
  // TODO сделать валидацию сообщения c файлом
  // @Validate(FileImageRule)
  image: string;
}
