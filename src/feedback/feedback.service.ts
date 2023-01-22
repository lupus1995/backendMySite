import { Injectable } from '@nestjs/common';

import { FeedbackDto } from './feedback.dto';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  // создание записи обратной связи
  async createFeedback({ feedback }: { feedback: FeedbackDto }) {
    const data = { ...feedback };

    if (data.falseField.length > 0) {
      return null;
    }

    delete data.falseField;

    return await this.feedbackRepository.create(data);
  }

  // получение сообщений с обратной связью
  async getFeedback({
    offset = 0,
    limit = 10,
  }: {
    offset: number;
    limit: number;
  }) {
    return await this.feedbackRepository.get({
      offset,
      limit,
    });
  }

  // удаление сообщение с обратной связью
  async deletedFeedback({ ids }: { ids: string[] }) {
    return await this.feedbackRepository.delete({ ids });
  }
}
