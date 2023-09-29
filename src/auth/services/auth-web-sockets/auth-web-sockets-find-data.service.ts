import { Injectable } from '@nestjs/common';
import { UserWebSocketsRepository } from 'src/auth/repositories/user-web-sockets.repository';

@Injectable()
export class AuthWebsocketsFindDataService {
  constructor(private userRepository: UserWebSocketsRepository) {}

  async findByUsername({ username }: { username: string }) {
    return await this.userRepository.findByUsername({ username });
  }

  async findByEmail({ email }: { email: string }) {
    return await this.userRepository.findByEmail({ email });
  }
}
