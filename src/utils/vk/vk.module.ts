import { DynamicModule, Module, Provider } from '@nestjs/common';
import { VK } from 'vk-io';
import * as dotenv from 'dotenv';

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
        const vk = new VK({
          token: process.env.vkAccessToken,
        });

        return new VkService(vk);
      },
    };

    return {
      module: VKModule,
      providers: [VKProvider],
      exports: [VKProvider],
      global: false,
    };
  }
}
