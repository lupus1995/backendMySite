import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Article,
  ArticleDocument,
} from '../../../utils/schemas/blog/article.schema';
import {
  Projects,
  ProjectsDocument,
} from '../../../utils/schemas/blog/projects.schema';
import { MONGOOSE_LINK_NEST } from '../../../constants';

@Injectable()
export class SitemapRepository {
  constructor(
    @InjectModel(Article.name, MONGOOSE_LINK_NEST)
    protected articleModel: Model<ArticleDocument>,
    @InjectModel(Projects.name, MONGOOSE_LINK_NEST)
    protected projectModel: Model<ProjectsDocument>,
  ) {}

  public async get(): Promise<{
    articles: string[];
    projects: string[];
  }> {
    const articlesIds = await this.getAllArticleIds();
    const urls = await this.getAllProjectsUrls();

    return {
      articles: articlesIds,
      projects: urls,
    };
  }

  private async getAllArticleIds(): Promise<string[]> {
    const articles = await this.articleModel.find();

    return articles.map((article) => article._id);
  }

  private async getAllProjectsUrls(): Promise<string[]> {
    const projects = await this.projectModel.find();

    return projects.map((project: Projects) => project.linkToProjectOnUi);
  }
}
