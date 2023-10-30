import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { UserRepository } from './repositories/user.repository';
import { UserRuleRepository } from './repositories/user-rule.repository';
import { UserService } from './user.service';
import { USER } from 'src/utils/schemas/web-sockets/user.schema';
import { TokensModule } from 'src/utils/tokens/tokens.module';
import { MessageRepository } from './repositories/message.repository';
import { MESSAGE } from 'src/utils/schemas/web-sockets/message.schema';
import { INTERLOCUTORS } from 'src/utils/schemas/web-sockets/rooms.schema';
import { MessageService } from './message.service';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([USER], MONGOOSE_LINK_SOCKETS),
    MongooseModule.forFeature([MESSAGE], MONGOOSE_LINK_SOCKETS),
    MongooseModule.forFeature([INTERLOCUTORS], MONGOOSE_LINK_SOCKETS),
    TokensModule,
  ],
  controllers: [UserController],
  providers: [
    UserRuleRepository,
    RoomsRepository,
    UserRepository,
    MessageRepository,
    Logger,
    MessageService,
    UserService,
    RoomsService,
  ],
})
export class UserModule {}
