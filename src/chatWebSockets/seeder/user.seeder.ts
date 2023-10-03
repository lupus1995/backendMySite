import { Injectable } from '@nestjs/common';
import { GenarateUserService } from './generate-user.service';
import { GenerateMessageService } from './generate-messages.service';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';

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
