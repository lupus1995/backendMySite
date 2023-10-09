import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as argon2 from 'argon2';
import { UserInterface } from './interfaces';
import { UserRepository } from './repositories/user.repository';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';
import { InterlocutorsRepository } from './repositories/interlocutors.repository';

@Injectable()
export class GenarateUserService {
  constructor(
    private userRepository: UserRepository,
    private logger: Logger,
    private interlocutorsRepository: InterlocutorsRepository,
  ) {}
  private createLogFile(data: UserInterface[]) {
    const writeStream = fs.createWriteStream('names.txt');
    data.forEach((item) => {
      writeStream.write(`${item.username}: ${item.password} \n`);
    });
    writeStream.end();
  }

  private async preparePasswordUsers(data: UserInterface[]) {
    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      newData[i].password = await argon2.hash(newData[i].password);
    }

    return newData;
  }

  private prepareNewUser(): UserInterface {
    return {
      lastname: faker.person.lastName(),
      firstname: faker.person.firstName(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      patronymic: faker.person.middleName(),
      avatar: faker.image.avatar(),
      listOfBlockedInterlocutors: [],
      listIOfDeletedDialogs: [],
    };
  }

  private generateNewUsers() {
    this.logger.log('Генерация новых пользователей');
    const data = faker.helpers.multiple(this.prepareNewUser, { count: 100 });
    this.logger.log('Новые пользователи сгенерированы');
    return data;
  }

  async generateUsers() {
    let users = this.generateNewUsers();
    this.logger.log('Создание файла с username и password');
    this.createLogFile(users);

    this.logger.log('Хеширование пароля пользователей');
    users = await this.preparePasswordUsers(users);

    this.logger.log('Занесение новых пользователей в базу данных');
    const userDocuments: UserType[] = await this.userRepository.create(users);
    this.logger.log('Новые пользователи занесены в базу данных');

    const ids = userDocuments.map((item) => item.id);
    await this.interlocutorsRepository.addInterlocutors(ids);

    return userDocuments;
  }
}
