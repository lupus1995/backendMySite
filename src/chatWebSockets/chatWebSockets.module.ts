import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_LINK_SOCKETS } from '../constants';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.mongooseLinkSockets, {
      useNewUrlParser: true,
      connectionName: MONGOOSE_LINK_SOCKETS,
    }),
    UserModule,
  ],
})
export class ChatWebSocketsModule {}
