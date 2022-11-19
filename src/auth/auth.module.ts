import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomUsernameValidation } from './exists-username.rule';
import { CustomLoginValidation } from './login.rule';

@Module({
  imports: [
    JwtModule.register({ secret: '$up3r$3cr3t' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [CustomUsernameValidation, CustomLoginValidation, AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
