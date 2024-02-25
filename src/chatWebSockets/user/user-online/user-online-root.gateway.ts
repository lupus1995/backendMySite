import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { UserDocument } from '@utils/schemas/web-sockets/user.schema';
import { TokensService } from '@utils/tokens/tokens.service';

import { IModule, Module } from './types';
import { UserOnlineService } from './user-online.service';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

export class UserOnlineRootGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    protected logger: Logger,
    protected readonly tokensService: TokensService,
    protected userService: UserService,
    protected userOnlineService: UserOnlineService,
    protected messageService: MessageService,
  ) {}

  private modules = {
    peerToPeer: '/peer-to-peer',
    userOnline: '/user-online',
  };

  private getModule(client: Socket): Module | null {
    if (client.nsp.name === this.modules.peerToPeer) {
      return IModule.peerToPeer;
    }

    if (client.nsp.name === this.modules.userOnline) {
      return IModule.userOnline;
    }

    return null;
  }

  private handleEmitOnline(client: Socket) {
    const module = this.getModule(client);
    const usersIsOnline: UserDocument[] = [];
    this.userOnlineService.users[module].forEach((user) => {
      return usersIsOnline.push(user);
    });
    this.server.emit('online', usersIsOnline);
  }

  handleDisconnect(client: Socket) {
    const module = this.getModule(client);
    const user = this.userOnlineService.getUser({ id: client.id, module });
    this.logger.log(
      `Пользователь отключился ${user.firstname} ${user.lastname} от чата`,
    );
    this.userOnlineService.deleteUser({ id: client.id, module });

    this.handleEmitOnline(client);
  }
  afterInit() {
    this.logger.log('Server initilazed');
  }
  async handleConnection(client: Socket) {
    const module = this.getModule(client);
    const token = client.handshake.auth.authorization;
    if (this.tokensService.checkToken({ token })) {
      const username = this.tokensService.getUserNameByToken(token);
      const activeUser: UserDocument = await this.userService.findByUsername({
        username,
      });
      this.userOnlineService.setUser({
        id: client.id,
        user: activeUser,
        module,
      });
      this.logger.log(
        `Пользователь подключился ${activeUser.firstname} ${activeUser.lastname} к чату`,
      );

      this.handleEmitOnline(client);
    } else {
      client.disconnect();
    }
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleEmitJoinRoom(
    @MessageBody() roomIds: string[],
    @ConnectedSocket() client: Socket,
  ) {
    const module = this.getModule(client);
    roomIds.map((roomId) => {
      client.join(roomId);
    });
    const user = this.userOnlineService.getUser({ id: client.id, module });

    this.logger.log(
      `Пользователь ${user.firstname} ${user.lastname} зашел в комнату`,
    );
  }

  @SubscribeMessage('leaveRoom')
  handleEmitLeftRoom(
    @MessageBody() roomIds: string[],
    @ConnectedSocket() client: Socket,
  ) {
    const module = this.getModule(client);
    roomIds.map((roomId) => {
      client.leave(roomId);
    });

    const user = this.userOnlineService.getUser({ id: client.id, module });

    this.logger.log(
      `Пользователь ${user.firstname} ${user.lastname} покинул комнату`,
    );
  }
}
