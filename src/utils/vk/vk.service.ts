import { Inject, Logger } from '@nestjs/common';
import { VK } from 'vk-io';

export class VkService {
  private logger;
  constructor(@Inject() private vk: VK) {
    this.logger = new Logger();
  }

  async sendPostToVk({
    attachments,
    description,
  }: {
    attachments: string;
    description: string;
  }) {
    try {
      return await this.vk.api.wall.post({
        owner_id: -Number(process.env.owner_id),
        attachments,
        message: description,
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
