import { Logger, Module } from '@nestjs/common';

import { AuthWebSocketsModule } from 'src/auth/services/auth-web-sockets/auth-web-sockets.module';

import { PasswordRule } from './password.rule';
import { UniqEmailRule } from './uniq-email.rule';
import { UniqUsernameRule } from './uniq-username.rule';
import { UsernameOrEmailRule } from './username-or-email.rule';

@Module({
  imports: [AuthWebSocketsModule],
  controllers: [],
  providers: [
    Logger,
    PasswordRule,
    UniqEmailRule,
    UniqUsernameRule,
    UsernameOrEmailRule,
  ],
  exports: [PasswordRule, UniqEmailRule, UniqUsernameRule, UsernameOrEmailRule],
})
export class WebsocketsRuleModule {}
