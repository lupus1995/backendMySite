import { IntersectionType } from '@nestjs/swagger';
import { QueryPaginationDto } from '../../utils/dto/query-pagination.dto';
import { HasFilterDto } from '../../utils/dto/has-filter.dto';

export class ArticlePaginationDto extends IntersectionType(
  QueryPaginationDto,
  HasFilterDto,
) {}
