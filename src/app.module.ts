import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ChatWebSocketsModule } from './chatWebSockets/chatWebSockets.module';

@Module({
  imports: [AuthModule, BlogModule, ChatWebSocketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
