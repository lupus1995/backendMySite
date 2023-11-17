import { Module } from '@nestjs/common';

import { AuthRepositoryModule } from 'src/auth/repositories/auth-repository.module';
import { ResponseModule } from 'src/utils/response/response.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

import { AuthBlogFindDataService } from './auth-blog-find-data.service';
import { AuthBlogValidateService } from './auth-blog-validate.service';
import { AuthBlogService } from './auth-blog.service';

@Module({
  imports: [AuthRepositoryModule, ResponseModule, TokensModule],
  controllers: [],
  providers: [
    AuthBlogFindDataService,
    AuthBlogValidateService,
    AuthBlogService,
  ],
  exports: [AuthBlogFindDataService, AuthBlogValidateService, AuthBlogService],
})
export class AuthBlogModule {}
