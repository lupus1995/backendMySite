import { Logger, Module } from '@nestjs/common';

import { AuthRepositoryModule } from 'src/auth/repositories/auth-repository.module';
import { ResponseModule } from 'src/utils/response/response.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

import { AuthWebsocketsFindDataService } from './auth-web-sockets-find-data.service';
import { AuthWebSocketsValidateService } from './auth-web-sockets-validate.service';
import { AuthWebSocketsService } from './auth-web-sockets.service';

@Module({
  imports: [AuthRepositoryModule, TokensModule, ResponseModule],
  controllers: [],
  providers: [
    AuthWebsocketsFindDataService,
    AuthWebSocketsValidateService,
    AuthWebSocketsService,
    Logger,
  ],
  exports: [
    AuthWebsocketsFindDataService,
    AuthWebSocketsValidateService,
    AuthWebSocketsService,
  ],
})
export class AuthWebSocketsModule {}
