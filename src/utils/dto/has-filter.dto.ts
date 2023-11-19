import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class HasFilterDto {
  @ApiProperty({
    type: Boolean,
    description: 'Нужно ли что-то фильтровать',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasFilter?: boolean;
}
