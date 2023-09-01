import { ExecutionContext, Inject } from '@nestjs/common';
import { TokenGuard } from '../utils/tokens/token.guard';
import { ArticleRepository } from '../utils/repositories/article.repository';
import { isAfter } from 'date-fns';
import { TokensService } from '../utils/tokens/tokens.service';

export class ArticleGuard extends TokenGuard {
  constructor(
    @Inject(TokensService) private readonly tokensService: TokensService,
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {
    super(tokensService);
  }
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
