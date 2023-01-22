import { CreateArticleDto } from './article.dto';

export const articleCreatedData: CreateArticleDto = {
  title: {
    ru: 'заголовок',
    en: 'title',
  },
  description: {
    ru: 'описание',
    en: 'description',
  },
  thumbnail: 'thumbnail',
  text: {
    ru: 'текст',
    en: 'text',
  },
  keyWords: {
    ru: 'ключевые слова',
    en: 'key words',
  },
  createdAt: '',
  updatedAt: '',
  publishedAt: '',
  hidePublishedArticle: false,
};
