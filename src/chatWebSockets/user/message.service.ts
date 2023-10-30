import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './repositories/message.repository';
import { RoomsDocument } from 'src/utils/schemas/web-sockets/rooms.schema';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';
import { MessageDocument } from 'src/utils/schemas/web-sockets/message.schema';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private logger: Logger,
  ) {}

  async getMessages({
    roomsIds,
    limit,
    offset,
  }: { roomsIds: string[] } & QueryPaginationDto) {
    const data: Array<{ message: MessageDocument; id: string }> = [];
    for (let i = 0; i < roomsIds.length - 1; i++) {
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
}
