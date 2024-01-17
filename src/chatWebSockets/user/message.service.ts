import { Injectable } from '@nestjs/common';

import { QueryPaginationDto } from '@utils/dto/query-pagination.dto';
import { MessageDocument } from '@utils/schemas/web-sockets/message.schema';

import { MessageRepository } from './repositories/message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async getMessages({
    roomsIds,
    limit,
    offset,
  }: { roomsIds: string[] } & QueryPaginationDto) {
    const data: Array<{ message: MessageDocument; id: string }> = [];
    for (let i = 0; i < roomsIds.length; i++) {
      const message = await this.messageRepository.getMessagesByRoomId(
        roomsIds[i],
      );
      data.push({
        id: roomsIds[i],
        message,
      });
    }
    return data
      .sort((a, b) => {
        return b.message.createdAt.getTime() - a.message.createdAt.getTime();
      })
      .splice(offset * limit, limit);
  }

  async getMessagesByRoomId({ roomId }: { roomId: string }) {
    return await this.messageRepository.getMessagesByRoomId(roomId);
  }
}
