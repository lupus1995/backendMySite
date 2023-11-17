import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import secrets from 'src/secrets';

import { TokensService } from './tokens.service';

@Module({
  imports: [JwtModule.register({ secret: secrets.jwtSecret })],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
