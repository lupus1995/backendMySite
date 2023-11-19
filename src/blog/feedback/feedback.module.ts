import { Module } from '@nestjs/common';

import { RepositoriesModule } from 'src/blog/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [TokensModule, RepositoriesModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
