import { IntersectionType } from '@nestjs/swagger';

import { HasFilterDto } from '../../../utils/dto/has-filter.dto';
import { QueryPaginationDto } from '../../../utils/dto/query-pagination.dto';

export class ArticlePaginationDto extends IntersectionType(
  QueryPaginationDto,
  HasFilterDto,
) {}
