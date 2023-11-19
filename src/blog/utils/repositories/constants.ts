import { Article, ArticleSchema } from 'src/utils/schemas/blog/article.schema';
import {
  Feedback,
  FeedbackSchema,
} from 'src/utils/schemas/blog/feedback.schema';
import {
  MainPage,
  MainPageSchema,
} from 'src/utils/schemas/blog/mainPage.schema';
import {
  Projects,
  ProjectsSchema,
} from 'src/utils/schemas/blog/projects.schema';
import { User, UserSchema } from 'src/utils/schemas/blog/user.schema';

export const ARTICLE = { name: Article.name, schema: ArticleSchema };
export const PROJECTS = { name: Projects.name, schema: ProjectsSchema };
export const MAIN_PAGE = { name: MainPage.name, schema: MainPageSchema };
export const USER = { name: User.name, schema: UserSchema };
export const FEEDBACK = { name: Feedback.name, schema: FeedbackSchema };
