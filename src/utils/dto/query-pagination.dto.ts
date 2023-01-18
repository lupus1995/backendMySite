import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class QueryPaginationDto {
  @ApiProperty({
    type: Number,
    description: 'Отступ по статьям',
  })
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @ApiProperty({
    type: Number,
    description: 'Количество отдаваемых статей',
  })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
