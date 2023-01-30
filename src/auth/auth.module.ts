import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { CustomUsernameValidation } from './rules/exists-username.rule';
import { CustomLoginValidation } from './rules/login.rule';

@Module({
  imports: [
    JwtModule.register({ secret: '$up3r$3cr3t' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    CustomUsernameValidation,
    CustomLoginValidation,
    AuthRepository,
    AuthService,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
