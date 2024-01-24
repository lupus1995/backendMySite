import { Logger, Module } from '@nestjs/common';

import { ResponseModule } from '@utils/response/response.module';
import { TokensModule } from '@utils/tokens/tokens.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepositoryModule } from './repositories/auth-repository.module';
import { BlogRuleModule } from './rules/blog/blog-rule.module';
import { WebsocketsRuleModule } from './rules/web-sockets/websockets-rule.module';
import { AuthBlogModule } from './services/auth-blog/auth-blog.module';
import { AuthWebSocketsModule } from './services/auth-web-sockets/auth-web-sockets.module';

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
