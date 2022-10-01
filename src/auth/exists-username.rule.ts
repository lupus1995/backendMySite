import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AuthService } from "./auth.service";

@ValidatorConstraint({ name: 'usernameId', async: true })
@Injectable()
export class CustomUsernameValidation implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthService) { }

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.authService.uniqUsername({ username: value })

    return !Boolean(user)
  }

  defaultMessage(args: ValidationArguments) {
    return `User already exist`;
  }
}