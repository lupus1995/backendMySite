import { Injectable, Logger } from '@nestjs/common';
import { GenarateUserService } from './generate-user.service';
import { UserType } from './interfaces';
import { GenerateMessageService } from './generate-messages.service';

@Injectable()
export class UserSeeder {
  constructor(
    private generateUserService: GenarateUserService,
    private generateMessagesService: GenerateMessageService,
    private logger: Logger,
  ) {}

  // генерация новых пользователей
  async seed(): Promise<void> {
    const users: UserType[] | UserType =
      await this.generateUserService.generateUsers();
    await this.generateMessagesService.runGenerateMessages(users);
  }
}
