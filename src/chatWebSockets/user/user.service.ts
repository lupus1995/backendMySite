import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserRuleRepository } from './repositories/user-rule.repository';
import { RegistrationDto } from './dto/registration.dto';
import { User } from 'src/utils/schemas/web-sockets/user.schema';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userRuleRepository: UserRuleRepository,
  ) {}

  async findByEmail({ email }: { email: string }) {
    return await this.userRuleRepository.findByEmail({ email });
  }

  async findByUsername({ username }: { username: string }) {
    return await this.userRuleRepository.findByUsername({ username });
  }

  async createUser({ data }: { data: RegistrationDto }) {
    const user: User = {
      ...data,
      patronymic: '',
      avatar: '',
      listOfBlockedInterlocutors: [],
      listIOfDeletedDialogs: [],
    };

    await this.userRepository.create(user);
  }

  async updateUser({ id, data }: { id: string; data: User }) {
    // TODO настроить сохранение аватарки после разделения модуля блога и чата
    return await this.userRepository.update({ id, data });
  }

  async getUser(id: string) {
    return await this.userRepository.findById(id);
  }

  async deleteUser(id: string) {
    // TODO настроить удаление аватарки после разделения модуля блога и чата
    return await this.userRepository.delete(id);
  }
}
