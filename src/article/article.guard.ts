import { ExecutionContext, Inject } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleRepository } from './article.repository';
import { isAfter } from 'date-fns';

export class ArticleGuard extends AuthGuard {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {
    super(authService);
  }
  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const id = this.getId(context);
    const article = await this.articleRepository.findById(id);

    if (isAfter(new Date(article.publishedAt), new Date())) {
      return super.canActivate(context);
    }
    return true;
  }

  getId(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const id = params.id;

    return id;
  }
}
