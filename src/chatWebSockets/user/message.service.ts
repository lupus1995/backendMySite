import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { InterlocutorType } from 'src/utils/schemas/web-sockets/interlocutors.schema';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private logger: Logger,
  ) {}

  async getMessageFromIntelocutor(interlocutors: InterlocutorType[]) {
    const messagesIds = interlocutors.map((item) => item.messageId);
    const messages = await this.messageRepository.getMessages(messagesIds);

    return messages;
  }

  async getMessagesFromFilterInterlocutor({
    interlocutors,
    users,
    limit,
    offset,
  }: {
    interlocutors: InterlocutorType[];
    users: UserType[];
  } & QueryPaginationDto) {
    const filterUsersIds: string[] = users.map((item) => item._id.toString());

    const draftFilterMessagesIds = interlocutors
      .filter((item) => filterUsersIds.includes(item.interlocutorId.toString()))
      .map((item) => item.messageId.toString());

    const messages = await this.messageRepository.getMessages(
      draftFilterMessagesIds,
    );

    return messages
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .splice(offset * limit, limit);
  }
}
