import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IncomingMessage } from "http";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<
      IncomingMessage & { user?: Record<string, unknown> }
    >(context); // you could use FastifyRequest here too
    try {
      const token = this.getToken(request);
      const user = this.authService.checkToken({ token });
      return true;
    } catch (e) {
      return false;
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    console.log('headers', request.headers);
    const token = request.headers['authorization'];
    if (!token || Array.isArray(token)) {
      throw new Error('Invalid Authorization Header');
    }
    return token;
  }
}
