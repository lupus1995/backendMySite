import { SignUpDto } from './sign-up.dto';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const errors: string[] = [];

    if (!this.valueHasPassAndConfPass(value)) {
      throw new BadRequestException('Invalid Request Body');
    }

    if (value.password.length < 12) {
      errors.push('password should be at least 12 characters long');
    }
    if (value.password !== value.confirmPassword) {
      errors.push('password and confirmationPassword do not match');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }

    return value;
  }
  
  private valueHasPassAndConfPass (val: unknown): val is SignUpDto {
    return (
      typeof val === 'object' &&
      'password' in val &&
      'username' in val
    );
  }
}
