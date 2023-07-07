import { Projects, ProjectsSchema } from 'src/schemas/projects.schema';
import { MainPage, MainPageSchema } from 'src/schemas/mainPage.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { Feedback, FeedbackSchema } from 'src/schemas/feedback.schema';

export const ARTICLE = { name: Article.name, schema: ArticleSchema };
export const PROJECTS = { name: Projects.name, schema: ProjectsSchema };
export const MAIN_PAGE = { name: MainPage.name, schema: MainPageSchema };
export const USER = { name: User.name, schema: UserSchema };
export const FEEDBACK = { name: Feedback.name, schema: FeedbackSchema };
