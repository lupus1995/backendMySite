import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { seeder } from 'nestjs-seeder';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { MESSAGE } from 'src/utils/schemas/web-sockets/message.schema';
import { INTERLOCUTORS } from 'src/utils/schemas/web-sockets/rooms.schema';
import { USER } from 'src/utils/schemas/web-sockets/user.schema';

import { GenerateMessageService } from './generate-messages.service';
import { GenarateUserService } from './generate-user.service';
import { MessageRepository } from './repositories/messages.repository';
import { RoomsRepository } from './repositories/rooms.repository';
import { UserRepository } from './repositories/user.repository';
import { UserSeeder } from './user.seeder';

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
    UserRepository,
    MessageRepository,
    RoomsRepository,
    Logger,
    GenarateUserService,
    GenerateMessageService,
  ],
}).run([UserSeeder]);
