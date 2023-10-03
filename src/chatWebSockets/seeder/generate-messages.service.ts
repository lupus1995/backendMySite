import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './repositories/messages.repository';
import { MessageInterface } from './interfaces';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';

@Injectable()
export class GenerateMessageService {
  constructor(
    private messagesRepository: MessageRepository,
    private logger: Logger,
  ) {}

  private prepareMessage(from: UserType, to: UserType) {
    return {
      from: from._id,
      to: to._id,
      typeMessage: 'TEXT',
      value: faker.lorem.text(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      image: null,
      isArchive: false,
      linkToImage: null,
      linkToAudio: null,
    };
  }

  private generateOneTwoOneMessages(
    firstUser: UserType,
    secondUser: UserType,
  ): () => [MessageInterface, MessageInterface] {
    return () => [
      this.prepareMessage(firstUser, secondUser),
      this.prepareMessage(secondUser, firstUser),
    ];
  }

  private generateMessages(firstUser: UserType, secondUser: UserType) {
    this.logger.log(
      `Генерируем черновики сообщений для пары пользователей ${firstUser.username} и ${secondUser.username}`,
    );
    const draftMessages = faker.helpers.multiple(
      this.generateOneTwoOneMessages(firstUser, secondUser),
      { count: 40 },
    );

    const messages: MessageInterface[] = [];

    draftMessages.forEach((item) => {
      messages.push(item[0]);
      messages.push(item[1]);
    });

    return messages;
  }

  async runGenerateMessages(users: UserType[]) {
    this.logger.log('Создаем главного пользователя');
    const mainUsers = users[0];

    this.logger.log('Формируем собеседников, исключаем главного пользователя');
    const newUsers = users.filter((user) => user._id !== mainUsers._id);

    this.logger.log('Генерация сообщений');
    let messages: MessageInterface[] = [];
    newUsers.forEach((item) => {
      messages = [...messages, ...this.generateMessages(mainUsers, item)];
    });

    this.logger.log('Сохранение сообщений');
    await this.messagesRepository.create(messages);
  }
}
