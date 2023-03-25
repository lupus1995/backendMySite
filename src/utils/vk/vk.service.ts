import { Inject, Logger } from '@nestjs/common';
import { VK } from 'vk-io';

export class VkService {
  private logger;
  constructor(@Inject() private vk: VK) {
    this.logger = new Logger();
  }

  async sendPostToVk() {
    try {
      this.vk.api.wall.post({
        owner_id: -Number(process.env.owner_id),
        message: 'test message',
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
