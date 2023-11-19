import { ArticleUpdatePipe } from './article.update.pipe';

describe('ArticleUpdatePipe', () => {
  let target;

  beforeEach(() => {
    target = new ArticleUpdatePipe();
  });

  it('check update send to telegram and vk', () => {
    const result = target.transform({
      isPublishedlegram: undefined,
      isPublishedVK: undefined,
    });

    expect(result).toStrictEqual({
      isPublishedlegram: false,
      isPublishedVK: false,
    });
  });
});
