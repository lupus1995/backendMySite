import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { FileImageRule } from '../rules/file-image.rule';
import { BaseMessageDto } from './base-message.dto';

export class MessageCreateDto extends BaseMessageDto {
  @ApiProperty({
    type: String,
    description: 'Картинка для типа сообщения image',
  })
  @Validate(FileImageRule)
  image: File;
}
