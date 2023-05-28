import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/schemas/article.schema';
import { Projects, ProjectsDocument } from 'src/schemas/projects.schema';

@Injectable()
export class SitemapRepository {
  constructor(
    @InjectModel(Article.name) protected articleModel: Model<ArticleDocument>,
    @InjectModel(Projects.name) protected projectModel: Model<ProjectsDocument>,
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
