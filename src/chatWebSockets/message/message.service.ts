import { Injectable } from '@nestjs/common';

import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';

import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';
import { TYPE_MESSAGE } from './enums/type-message';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async getMessages({
    roomId,
    limit,
    offset,
  }: { roomId: string } & QueryPaginationDto) {
    const data = await this.messageRepository.getAll({
      roomId,
      limit,
      offset,
      hasFilter: true,
    });

    return {
      ...data,
      messages: data.messages.reverse(),
    };
  }

  async createMessage(data: MessageCreateDto) {
    const message = {
      ...data,
      isArchive: false,
      linkToImage: '',
      linkToAudio: '',
    };

    return await this.messageRepository.create(message);
  }

  async updateMessage({ data, id }: { data: MessageDto; id: string }) {
    return await this.messageRepository.update({ id, data });
  }

  async deleteMessage({ to, from }: { to: string; from: string }) {
    const messages = await this.messageRepository.getMessagesByFromAndTo({
      from,
      to,
    });
    const ids = messages.map((message) => message._id.toString());
    return await this.messageRepository.delete(ids);
  }

  getTypesMessage() {
    return TYPE_MESSAGE;
  }
}
