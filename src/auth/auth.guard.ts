import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IncomingMessage } from "http";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<
      IncomingMessage & { user?: Record<string, unknown> }
    >(context); // you could use FastifyRequest here too
    try {
      const token = this.getToken(request);
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      // return false or throw a specific error if desired
      return false;
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const token = request.headers['authorization'];
    if (!token || Array.isArray(token)) {
      throw new Error('Invalid Authorization Header');
    }
    return token;
  }
}
