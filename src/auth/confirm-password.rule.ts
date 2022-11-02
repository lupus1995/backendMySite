import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AuthService } from "./auth.service";

@ValidatorConstraint({ name: 'confirmPasswordId', async: true })
@Injectable()
export class CustomConfirmPasswordValidation implements ValidatorConstraintInterface {
    constructor() { }

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        // @ts-ignore
        return args.object.password === value
    }

    defaultMessage(args: ValidationArguments) {
        return `Fields password and confirmPassword don't match`;
    }
}