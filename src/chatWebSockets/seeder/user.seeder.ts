import { Injectable } from '@nestjs/common';

import { UserType } from 'src/utils/schemas/web-sockets/user.schema';

import { GenerateMessageService } from './generate-messages.service';
import { GenarateUserService } from './generate-user.service';

@Injectable()
export class UserSeeder {
  constructor(
    private generateUserService: GenarateUserService,
    private generateMessagesService: GenerateMessageService,
  ) {}

  // генерация новых пользователей
  async seed(): Promise<void> {
    const users: UserType[] = await this.generateUserService.generateUsers();
    await this.generateMessagesService.runGenerateMessages(users);
  }
}
