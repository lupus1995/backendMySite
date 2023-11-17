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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return args.object.password === value;
  }

  defaultMessage() {
    return `Fields password and confirmPassword don't match`;
  }
}
