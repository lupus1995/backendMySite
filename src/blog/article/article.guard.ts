import { ExecutionContext, Inject } from '@nestjs/common';
import { isAfter } from 'date-fns';

import { TokenGuard } from '@utils/tokens/token.guard';
import { TokensService } from '@utils/tokens/tokens.service';
import { ArticleRepository } from 'blog/utils/repositories/article.repository';

export class ArticleGuard extends TokenGuard {
  constructor(
    @Inject(TokensService) private readonly tokensService: TokensService,
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {
    super(tokensService);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const id = this.getId(context);
    const article = await this.articleRepository.findById(id);

    if (!article) {
      return false;
    }

    // если статья должна публиковаться после текущей даты, то посмотреть ее может только авторизованный пользователь
    if (isAfter(new Date(article?.publishedAt), new Date())) {
      return super.canActivate(context);
    }

    return true;
  }

  getId(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const id = params?.id || '';

    return id;
  }
}
