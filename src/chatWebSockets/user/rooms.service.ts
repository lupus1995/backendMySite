import { Injectable } from '@nestjs/common';

import { RoomsRepository } from './repositories/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async getRooms({ userId }: { userId: string }) {
    return await this.roomsRepository.getRoomsByInterlocutor({ userId });
  }
}
