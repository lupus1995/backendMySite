import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { UserDocument } from 'utils/schemas/web-sockets/user.schema';
import { TokensService } from 'utils/tokens/tokens.service';

import { UserOnlineService } from './user-online.service';
import { UserService } from '../user.service';

@WebSocketGateway(5000, { namespace: '/user-online', cors: true })
export class UserOnlineGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private logger: Logger,
    private readonly tokensService: TokensService,
    private userService: UserService,
    private userOnlineService: UserOnlineService,
  ) {}

  handleDisconnect(client: Socket) {
    const user = this.userOnlineService.getUser(client.id);
    this.logger.log(
      `Пользователь отключился ${user.firstname} ${user.lastname} от чата`,
    );
    this.userOnlineService.deleteUser(client.id);

    this.handleEmitOnline();
  }
  afterInit() {
    this.logger.log('Server initilazed');
  }
  async handleConnection(client: Socket) {
    const token = client.handshake.auth.authorization;
    if (this.tokensService.checkToken({ token })) {
      const username = this.tokensService.getUserNameByToken(token);
      const activeUser: UserDocument = await this.userService.findByUsername({
        username,
      });
      this.userOnlineService.setUser({ id: client.id, user: activeUser });
      this.logger.log(
        `Пользователь подключился ${activeUser.firstname} ${activeUser.lastname} к чату`,
      );

      this.handleEmitOnline();
    } else {
      client.disconnect();
    }
  }

  @WebSocketServer()
  server: Server;

  handleEmitOnline() {
    const usersIsOnline: UserDocument[] = [];
    this.userOnlineService.users.forEach((user) => {
      return usersIsOnline.push(user);
    });
    this.server.emit('online', usersIsOnline);
  }
}
