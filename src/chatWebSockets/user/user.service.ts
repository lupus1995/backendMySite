import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserRuleRepository } from './repositories/user-rule.repository';
import { RegistrationDto } from './dto/registration.dto';
import { User, UserType } from 'src/utils/schemas/web-sockets/user.schema';
import { InterlocutorType } from 'src/utils/schemas/web-sockets/interlocutors.schema';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userRuleRepository: UserRuleRepository,
    private logger: Logger,
  ) {}

  async findByEmail({ email }: { email: string }) {
    return await this.userRuleRepository.findByEmail({ email });
  }

  async findByUsername({ username }: { username: string }) {
    return await this.userRuleRepository.findByUsername({ username });
  }

  async getUserFromInterlocutor(interlocutors: InterlocutorType[]) {
    const usersIds = interlocutors.map((item) => item.interlocutorId);

    const users = await this.userRepository.findAllByTo(usersIds);

    return users;
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

  async searchUsers({ users, search }: { users: UserType[]; search: string }) {
    const filterUsers = users.filter((user) => {
      const name = `${user.firstname} ${user.lastname} ${user.patronymic}`;

      return name.search(search) !== -1 || user.username.search(search) !== -1;
    });

    return filterUsers;
  }
}
