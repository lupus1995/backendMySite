import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { TokensService } from './tokens.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<
      IncomingMessage & { user?: Record<string, unknown> }
    >(context); // you could use FastifyRequest here too
    try {
      const token = this.getToken(request);
      return this.tokensService.checkToken({ token });
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
    const token = request.headers['authorization'];
    if (!token || Array.isArray(token)) {
      throw new Error('Invalid Authorization Header');
    }
    return token;
  }
}
