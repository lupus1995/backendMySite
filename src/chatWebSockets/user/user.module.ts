import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { USER } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_LINK_SOCKETS } from 'src/constants';
import { UserRepository } from './repositories/user.repository';
import { UserRuleRepository } from './repositories/user-rule.repository';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([USER], MONGOOSE_LINK_SOCKETS)],
  controllers: [UserController],
  providers: [UserRuleRepository, UserRepository, Logger, UserService],
})
export class UserModule {}
