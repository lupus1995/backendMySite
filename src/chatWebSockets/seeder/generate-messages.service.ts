import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './repositories/messages.repository';
import { MessageInterface } from './interfaces';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomsDocument } from 'src/utils/schemas/web-sockets/rooms.schema';

@Injectable()
export class GenerateMessageService {
  constructor(
    private messagesRepository: MessageRepository,
    private roomsRepository: RoomsRepository,
    private logger: Logger,
  ) {}

  private prepareMessage(from: UserType, to: UserType, roomId: string) {
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
      roomId,
    };
  }

  private generateOneTwoOneMessages(
    firstUser: UserType,
    secondUser: UserType,
    roomId: string,
  ): () => [MessageInterface, MessageInterface] {
    return () => [
      this.prepareMessage(firstUser, secondUser, roomId),
      this.prepareMessage(secondUser, firstUser, roomId),
    ];
  }

  private async generateMessages(firstUser: UserType, secondUser: UserType) {
    this.logger.log('Создаем комнату');
    const room: RoomsDocument = await this.roomsRepository.createRoom({
      interlocutors: [firstUser._id, secondUser._id],
    });
    this.logger.log(
      `Генерируем сообщения для пары пользователей ${firstUser.username} и ${secondUser.username}`,
    );
    const draftMessages = faker.helpers.multiple(
      this.generateOneTwoOneMessages(firstUser, secondUser, room._id),
      {
        count: 40,
      },
    );

    const messages: MessageInterface[] = [];

    draftMessages.forEach((item) => {
      messages.push(item[0]);
      messages.push(item[1]);
    });

    this.logger.log('Сохранение сообщений');
    await this.messagesRepository.create(messages);
  }

  async runGenerateMessages(users: UserType[]) {
    this.logger.log('Создаем главного пользователя');
    const mainUsers = users[0];

    this.logger.log('Формируем собеседников, исключаем главного пользователя');
    const newUsers = users.filter((user) => user._id !== mainUsers._id);

    for (let i = 0; i <= newUsers.length - 1; i++) {
      await this.generateMessages(mainUsers, newUsers[i]);
    }
  }
}
