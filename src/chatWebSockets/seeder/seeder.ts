import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { seeder } from 'nestjs-seeder';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { USER } from 'src/utils/schemas/web-sockets/user.schema';
import { UserRepository } from './repositories/user.repository';
import { UserSeeder } from './user.seeder';
import { Logger } from '@nestjs/common';
import { GenarateUserService } from './generate-user.service';
import { GenerateMessageService } from './generate-messages.service';
import { MessageRepository } from './repositories/messages.repository';
import { MESSAGE } from 'src/utils/schemas/web-sockets/message.schema';
import { INTERLOCUTORS } from 'src/utils/schemas/web-sockets/interlocutors.schema';
import { InterlocutorsRepository } from './repositories/interlocutors.repository';

dotenv.config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLinkSockets, {
      useNewUrlParser: true,
      connectionName: MONGOOSE_LINK_SOCKETS,
    }),
    MongooseModule.forFeature([USER], MONGOOSE_LINK_SOCKETS),
    MongooseModule.forFeature([MESSAGE], MONGOOSE_LINK_SOCKETS),
    MongooseModule.forFeature([INTERLOCUTORS], MONGOOSE_LINK_SOCKETS),
  ],
  providers: [
    UserSeeder,
    InterlocutorsRepository,
    UserRepository,
    MessageRepository,
    Logger,
    GenarateUserService,
    GenerateMessageService,
  ],
}).run([UserSeeder]);
