import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER as USER_BLOG } from 'src/blog/utils/repositories/constants';
import { MONGOOSE_LINK_NEST, MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { USER as USER_WEB_SOCKETS } from 'src/utils/schemas/web-sockets/user.schema';
import { UserBlogRepository } from './user-blog.repository';
import { UserWebSocketsRepository } from './user-web-sockets.repository';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([USER_BLOG], MONGOOSE_LINK_NEST),
    MongooseModule.forFeature([USER_WEB_SOCKETS], MONGOOSE_LINK_SOCKETS),
  ],
  providers: [UserBlogRepository, UserWebSocketsRepository, Logger],
  exports: [UserBlogRepository, UserWebSocketsRepository],
})
export class AuthRepositoryModule {}
