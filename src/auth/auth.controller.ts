import { SignUpDto } from './sign-up.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup') 
    signup (@Body() newUser: SignUpDto) {
        return this.authService.signup(newUser);
    }

    @Post('login')
    login (@Body() login: LoginDto) {
        return this.authService.login(login);
    }
}
