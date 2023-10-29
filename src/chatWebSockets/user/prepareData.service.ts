import { Injectable, Logger } from '@nestjs/common';
import { InterlocutorType } from 'src/utils/schemas/web-sockets/interlocutors.schema';
import { MessageType } from 'src/utils/schemas/web-sockets/message.schema';
import { UserType } from 'src/utils/schemas/web-sockets/user.schema';

@Injectable()
export class PrepareDataService {
  constructor(private logger: Logger) {}

  prepareInterlocutors({
    users,
    messages,
  }: {
    users: UserType[];
    messages: MessageType[];
  }) {
    const interlocutors: {
      interlocutor: UserType;
      message: MessageType;
      id: string;
    }[] = Array.from({ length: users.length }).map((_, index) => ({
      interlocutor: users[index],
      message: messages[index],
      id: users[index]._id,
    }));

    return interlocutors;
  }

  prepareSearchInterlocutor({
    draftInterlocutors,
    interlocutors,
    messages,
  }: {
    draftInterlocutors: InterlocutorType[];
    interlocutors: UserType[];
    messages: MessageType[];
  }) {
    const messagesIds = messages.map((item) => item._id.toString());
    const data: {
      interlocutor: UserType;
      message: MessageType;
      id: string;
    }[] = draftInterlocutors
      .filter((item) => messagesIds.includes(item.messageId.toString()))
      .map((item) => {
        const interlocutor = interlocutors.find(
          (interlocutorItem) =>
            interlocutorItem._id.toString() === item.interlocutorId.toString(),
        );
        return {
          interlocutor,
          message: messages.find(
            (messageItem) =>
              messageItem._id.toString() === item.messageId.toString(),
          ),
          id: interlocutor._id,
        };
      });

    return data;
  }
}
