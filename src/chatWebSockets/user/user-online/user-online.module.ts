import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { USER } from 'utils/schemas/web-sockets/user.schema';
import { TokensModule } from 'utils/tokens/tokens.module';

import { UserOnlineGateway } from './user-online.gateway';
import { UserOnlineService } from './user-online.service';
import { UserRuleRepository } from '../repositories/user-rule.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../user.service';

@Module({
  imports: [
    MongooseModule.forFeature([USER], MONGOOSE_LINK_SOCKETS),
    TokensModule,
  ],
  providers: [
    UserRuleRepository,
    UserRepository,
    Logger,
    UserService,
    UserOnlineGateway,
    UserOnlineService,
  ],
})
export class UserOnlineModule {}
