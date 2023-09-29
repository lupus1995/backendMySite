import { Logger, Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { MessageRepository } from './message.repository';
import { MESSAGE } from '../../utils/schemas/web-sockets/message.schema';

@Module({
  imports: [MongooseModule.forFeature([MESSAGE], MONGOOSE_LINK_SOCKETS)],
  controllers: [MessageController],
  providers: [MessageRepository, Logger, MessageService],
})
export class MessageModule {}
