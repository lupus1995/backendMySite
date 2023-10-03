import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  public generateTokens({ username }: { username: string }) {
    const accessToken = this.jwtService.sign(
      { sub: username },
      { expiresIn: '6000s' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: username },
      { expiresIn: '12000s' },
    );

    return { accessToken, refreshToken };
  }

  protected authException() {
    throw new HttpException(
      'Для просмотра страницы необходимо авторизоваться',
      HttpStatus.FORBIDDEN,
    );
  }

  /**
   * обновление токенов
   */
  public async refreshTokens({ token }: { token: string }) {
    try {
      const username = this.jwtService.verify(token).sub;
      if (username) {
        return this.generateTokens({ username });
      }

      this.authException();
    } catch {
      this.authException();
    }
  }

  public getUserNameByToken(token: string): string {
    return this.jwtService.verify(token).sub;
  }

  // проверка токена на его актуальность
  public checkToken({ token }: { token: string }) {
    try {
      return Boolean(this.jwtService.verify(token).sub);
    } catch {
      return false;
    }
  }
}
