import { Injectable } from '@nestjs/common';
import { SitemapRepository } from '../utils/repositories/sitemap.repository';

@Injectable()
export class SitemapService {
  constructor(private sitemapRepository: SitemapRepository) {}

  public async get() {
    return await this.sitemapRepository.get();
  }
}
