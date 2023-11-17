import { Injectable, PipeTransform } from '@nestjs/common';

import { CreateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleUpdatePipe implements PipeTransform {
  transform(value: CreateArticleDto) {
    const newValue = { ...value };
    if (typeof value.isPublishedlegram === 'undefined') {
      newValue.isPublishedlegram = false;
    }

    if (typeof value.isPublishedVK === 'undefined') {
      newValue.isPublishedVK = false;
    }
    return newValue;
  }
}
