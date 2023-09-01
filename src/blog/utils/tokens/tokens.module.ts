import { Module } from '@nestjs/common';
import secrets from '../../../secrets';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  imports: [JwtModule.register({ secret: secrets.jwtSecret })],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
