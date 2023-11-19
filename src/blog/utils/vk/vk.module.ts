import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { VK } from 'vk-io';

import { VkService } from './vk.service';

dotenv.config();

@Module({
  providers: [VkService],
})
export class VKModule {
  static forRoot(): DynamicModule {
    const VKProvider: Provider = {
      provide: VkService,
      useFactory: () => {
        const logger = new Logger();
        const vk = new VK({
          token: process.env.vkAccessToken,
        });

        return new VkService(vk, logger);
      },
    };

    return {
      module: VKModule,
      providers: [VKProvider, Logger],
      exports: [VKProvider],
      global: false,
    };
  }
}
