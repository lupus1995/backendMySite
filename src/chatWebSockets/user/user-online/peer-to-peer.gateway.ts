import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { TokensService } from 'src/utils/tokens/tokens.service';

import { UserOnlineRootGateway } from './user-online-root.gateway';
import { UserOnlineService } from './user-online.service';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@WebSocketGateway(5000, { namespace: '/peer-to-peer', cors: true })
export class PeerToPeerGateway extends UserOnlineRootGateway {
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

  @SubscribeMessage('offer')
  async handleOffer(
    @MessageBody()
    payload: {
      target: string;
      caller: string;
      sdp: RTCSessionDescription;
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(payload.target).emit('offer', payload);
  }

  @SubscribeMessage('answer')
  async handleAnswer(
    @MessageBody()
    payload: {
      target: string;
      caller: string;
      sdp: RTCSessionDescription;
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(payload.target).emit('answer', payload);
  }

  @SubscribeMessage('ice-candidate')
  async handleIceCandidate(
    @MessageBody()
    payload: {
      target: string;
      candidate: unknown;
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(payload.target).emit('ice-candidate', payload.candidate);
  }
}
