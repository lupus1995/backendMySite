import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'confirmPasswordId', async: true })
@Injectable()
export class CustomConfirmPasswordValidation
  implements ValidatorConstraintInterface
{
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    // @ts-ignore
    return args.object.password === value;
  }

  defaultMessage() {
    return `Fields password and confirmPassword don't match`;
  }
}
