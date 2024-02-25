import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { TokensService } from '@utils/tokens/tokens.service';

import { UserOnlineRootGateway } from './user-online-root.gateway';
import { UserOnlineService } from './user-online.service';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@WebSocketGateway(5000, { namespace: '/user-online', cors: true })
export class UserOnlineGateway extends UserOnlineRootGateway {
  constructor(
    protected logger: Logger,
    protected readonly tokensService: TokensService,
    protected userService: UserService,
    protected userOnlineService: UserOnlineService,
    protected messageService: MessageService,
  ) {
    super(
      logger,
      tokensService,
      userService,
      userOnlineService,
      messageService,
    );
  }

  @SubscribeMessage('updateInterlocutor')
  async handleEmitUpdateInterlocutor(@MessageBody() roomId: string) {
    const message = await this.messageService.getMessagesByRoomId({ roomId });

    const interlocutor = await this.userService.findById({
      userId: message.to,
    });

    const data = {
      id: roomId,
      interlocutor,
      message,
    };

    this.server.in(roomId).emit('updateInterlocutor', data);
  }
}
