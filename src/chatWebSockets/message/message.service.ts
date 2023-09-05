import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { MessageCreateDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async getMessages({
    to,
    from,
    limit,
    offset,
  }: { from: string; to: string } & QueryPaginationDto) {
    await this.messageRepository.getAll({
      to,
      from,
      limit,
      offset,
    });
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

  async deteteMessage({ to, from }: { to: string; from: string }) {
    const messages = await this.messageRepository.getMessagesByFromAndTo({
      from,
      to,
    });
    const ids = messages.map((message) => message._id.toString());
    return await this.messageRepository.delete(ids);
  }
}
