import { Inject, Logger } from '@nestjs/common';
import { VK } from 'vk-io';

export class VkService {
  constructor(@Inject() private vk: VK, private logger: Logger) {}

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
