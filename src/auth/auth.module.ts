import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomUsernameValidation } from './rules/exists-username.rule';
import { CustomLoginValidation } from './rules/login.rule';
import { RepositoriesModule } from 'src/utils/repositories/repositories.module';
import { TokensModule } from 'src/utils/tokens/tokens.module';

@Module({
  imports: [TokensModule, RepositoriesModule],
  controllers: [AuthController],
  providers: [CustomUsernameValidation, CustomLoginValidation, AuthService],
})
export class AuthModule {}
