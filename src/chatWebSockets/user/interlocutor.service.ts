import { Injectable, Logger } from '@nestjs/common';
import { InterlocutorsRepository } from './repositories/interlocutors.repository';
import { QueryPaginationDto } from 'src/utils/dto/query-pagination.dto';

@Injectable()
export class InterlocutorService {
  constructor(
    private interlocutorsRepository: InterlocutorsRepository,
    private logger: Logger,
  ) {}

  async getAllInterlocutors({ userId }: { userId: string }) {
    return await this.interlocutorsRepository.getAllInterlocutors({ userId });
  }

  async getDraftInterlocutors({
    userId,
    limit,
    offset,
  }: {
    userId: string;
  } & QueryPaginationDto) {
    const interlocutors = await this.getAllInterlocutors({ userId });

    interlocutors.interlocutors = interlocutors.interlocutors
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .splice(offset * limit, limit);

    return interlocutors;
  }
}
