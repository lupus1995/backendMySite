import { Injectable } from '@nestjs/common';

import { RoomsDocument } from 'utils/schemas/web-sockets/rooms.schema';
import {
  User,
  UserDocument,
  UserType,
} from 'utils/schemas/web-sockets/user.schema';

import { RegistrationDto } from './dto/registration.dto';
import { UserRuleRepository } from './repositories/user-rule.repository';
import { UserRepository } from './repositories/user.repository';

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

  // на данный момент в диалоге может участвовать только двое людей
  // если в дальнейшем будет расширение до групповых переписок,
  // то необходимо будет ввести типы для общения между собеседниками
  async findInterlocutors({
    data,
    currentUser,
    search = '',
  }: {
    data: RoomsDocument[];
    currentUser: UserDocument;
    search?: string;
  }) {
    const newData: {
      interlocutor: UserDocument;
      id: string;
    }[] = [];
    for (let i = 0; i < data.length - 1; i++) {
      const interlocutorId = data[i].interlocutors.find(
        (item) => item.toString() !== currentUser._id.toString(),
      );
      const interlocutor = await this.userRepository.findById(interlocutorId);
      newData.push({
        id: data[i]._id,
        interlocutor,
      });
    }

    if (search) {
      return newData;
    }

    return newData.filter((item) => {
      const { interlocutor } = item;
      const name = `${interlocutor.firstname} ${interlocutor.lastname} ${interlocutor.patronymic}`;

      return (
        name.search(search) !== -1 ||
        interlocutor.username.search(search) !== -1
      );
    });
  }

  async createUser({ data }: { data: RegistrationDto }) {
    const user: User = {
      ...data,
      patronymic: '',
      avatar: '',
      listOfBlockedInterlocutors: [],
      listIOfDeletedDialogs: [],
    };

    return await this.userRepository.create(user);
  }

  async searchUsers({ users, search }: { users: UserType[]; search: string }) {
    const filterUsers = users.filter((user) => {
      const name = `${user.firstname} ${user.lastname} ${user.patronymic}`;

      return name.search(search) !== -1 || user.username.search(search) !== -1;
    });

    return filterUsers;
  }
}
