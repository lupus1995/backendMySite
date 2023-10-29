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
import { INTERLOCUTORS } from 'src/utils/schemas/web-sockets/interlocutors.schema';
import { InterlocutorsRepository } from './repositories/interlocutors.repository';
import { InterlocutorService } from './interlocutor.service';
import { MessageService } from './message.service';
import { PrepareDataService } from './prepareData.service';

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
    InterlocutorsRepository,
    UserRepository,
    MessageRepository,
    Logger,
    InterlocutorService,
    MessageService,
    PrepareDataService,
    UserService,
  ],
})
export class UserModule {}
