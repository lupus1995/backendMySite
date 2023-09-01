import { Projects, ProjectsSchema } from 'src/blog/schemas/projects.schema';
import { MainPage, MainPageSchema } from 'src/blog/schemas/mainPage.schema';
import { User, UserSchema } from 'src/blog/schemas/user.schema';
import { Article, ArticleSchema } from 'src/blog/schemas/article.schema';
import { Feedback, FeedbackSchema } from 'src/blog/schemas/feedback.schema';

export const ARTICLE = { name: Article.name, schema: ArticleSchema };
export const PROJECTS = { name: Projects.name, schema: ProjectsSchema };
export const MAIN_PAGE = { name: MainPage.name, schema: MainPageSchema };
export const USER = { name: User.name, schema: UserSchema };
export const FEEDBACK = { name: Feedback.name, schema: FeedbackSchema };
