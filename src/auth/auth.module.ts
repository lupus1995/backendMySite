import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TokensModule } from 'src/utils/tokens/tokens.module';
import { AuthBlogService } from './services/auth-blog/auth-blog.service';
import { AuthBlogValidateService } from './services/auth-blog/auth-blog-validate.service';
import { AuthService } from './auth.service';
import { ResponseModule } from 'src/utils/response/response.module';
import { AuthRepositoryModule } from './repositories/auth-repository.module';
import { AuthWebSocketsModule } from './services/auth-web-sockets/auth-web-sockets.module';
import { WebsocketsRuleModule } from './rules/web-sockets/websockets-rule.module';
import { AuthBlogModule } from './services/auth-blog/auth-blog.module';
import { BlogRuleModule } from './rules/blog/blog-rule.module';

@Module({
  imports: [
    AuthRepositoryModule,
    AuthWebSocketsModule,
    WebsocketsRuleModule,
    AuthBlogModule,
    TokensModule,
    ResponseModule,
    BlogRuleModule,
  ],
  controllers: [AuthController],
  providers: [Logger, AuthService],
})
export class AuthModule {}
