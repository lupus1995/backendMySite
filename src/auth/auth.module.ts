import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TokensModule } from 'src/utils/tokens/tokens.module';
import { AuthBlogService } from './services/auth-blog/auth-blog.service';
import { AuthBlogValidateService } from './services/auth-blog/auth-blog-validate.service';
import { UserBlogRepository } from './repositories/user-blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER as USER_BLOG } from 'src/blog/utils/repositories/constants';
import { MONGOOSE_LINK_NEST, MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { USER as USER_WEB_SOCKETS } from 'src/utils/schemas/web-sockets/user.schema';
import { UserWebSocketsRepository } from './repositories/user-web-sockets.repository';
import { AuthWebSocketsService } from './services/auth-web-sockets/auth-web-sockets.service';
import { AuthWebSocketsValidateService } from './services/auth-web-sockets/auth-web-sockets-validate.service';
import { AuthService } from './auth.service';
import { ResponseModule } from 'src/utils/response/response.module';
import { UniqUsernameRule } from './rules/web-sockets/uniq-username.rule';
import { AuthWebsocketsFindDataService } from './services/auth-web-sockets/auth-web-sockets-find-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([USER_BLOG], MONGOOSE_LINK_NEST),
    MongooseModule.forFeature([USER_WEB_SOCKETS], MONGOOSE_LINK_SOCKETS),
    TokensModule,
    ResponseModule,
  ],
  controllers: [AuthController],
  providers: [
    UserBlogRepository,
    UserWebSocketsRepository,
    AuthBlogService,
    AuthBlogValidateService,
    AuthWebSocketsService,
    AuthWebSocketsValidateService,
    Logger,
    AuthService,
    AuthWebsocketsFindDataService,
    UniqUsernameRule,
  ],
})
export class AuthModule {}
