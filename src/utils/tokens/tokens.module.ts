import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import secrets from 'src/secrets';

@Module({
  imports: [JwtModule.register({ secret: secrets.jwtSecret })],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
