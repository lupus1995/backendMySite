import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';
import { QueryPaginationDto } from '../../utils/dto/query-pagination.dto';

export class ArticlePaginationDto extends QueryPaginationDto {
  @ApiProperty({
    type: Boolean,
    description: 'Нужно ли фильтровать статьи',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasFilter: boolean;
}
