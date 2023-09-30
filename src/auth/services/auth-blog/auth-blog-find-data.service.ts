import { Injectable } from '@nestjs/common';
import { UserBlogRepository } from 'src/auth/repositories/user-blog.repository';

@Injectable()
export class AuthBlogFindDataService {
  constructor(private userRepository: UserBlogRepository) {}

  /**
   * поиск уникального пользователя по имени
   */
  public async uniqUsername({ username }: { username: string }) {
    return await this.userRepository.findOne(username);
  }
}
