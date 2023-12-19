import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { TokensModule } from 'utils/tokens/tokens.module';

import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { MESSAGE } from '../../utils/schemas/web-sockets/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([MESSAGE], MONGOOSE_LINK_SOCKETS),
    TokensModule,
  ],
  controllers: [MessageController],
  providers: [MessageRepository, Logger, MessageService],
})
export class MessageModule {}
