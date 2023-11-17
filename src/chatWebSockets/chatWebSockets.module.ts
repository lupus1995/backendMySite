import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { MONGOOSE_LINK_SOCKETS } from '../constants';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLinkSockets, {
      useNewUrlParser: true,
      connectionName: MONGOOSE_LINK_SOCKETS,
    }),
    UserModule,
    MessageModule,
  ],
})
export class ChatWebSocketsModule {}
