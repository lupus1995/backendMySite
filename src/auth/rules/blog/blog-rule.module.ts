import { Module } from '@nestjs/common';

import { AuthBlogModule } from 'src/auth/services/auth-blog/auth-blog.module';

import { CustomConfirmPasswordValidation } from './confirm-password.rule';
import { CustomUsernameValidation } from './exists-username.rule';
import { CustomLoginValidation } from './login.rule';
import { PasswordRule } from './password.rule';

@Module({
  imports: [AuthBlogModule],
  controllers: [],
  providers: [
    CustomConfirmPasswordValidation,
    CustomUsernameValidation,
    CustomLoginValidation,
    PasswordRule,
  ],
  exports: [
    CustomConfirmPasswordValidation,
    CustomUsernameValidation,
    CustomLoginValidation,
    PasswordRule,
  ],
})
export class BlogRuleModule {}
