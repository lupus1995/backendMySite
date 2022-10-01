import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AuthService } from "./auth.service";

@ValidatorConstraint({ name: 'login', async: true })
@Injectable()
export class CustomLoginValidation implements ValidatorConstraintInterface {
    constructor(protected readonly authService: AuthService) {}

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const user = await this.authService.uniqUsername({ username: value })
    
        return user !== null && Boolean(user)
      }
      
      defaultMessage(args: ValidationArguments) {
        return `User does not exist`;
      }
}