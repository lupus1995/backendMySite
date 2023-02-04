import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {
    this.logger = new Logger();
  }

  protected generateTokens({ username }: { username: string }) {
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
   * поиск уникального пользователя по имени
   */
  public async uniqUsername({ username }: { username: string }) {
    return await this.authRepository.findOne(username);
  }

  /**
   * регистрация пользователя
   */
  public async signup(
    user: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    await this.authRepository.create({
      ...user,
      password: await argon2.hash(user.password),
    });

    return this.generateTokens({ username: user.username });
  }

  /**
   * авторизация пользователя
   */
  public async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.uniqUsername({ username });
    const isVerifyPassword = await argon2.verify(user?.password, password);
    if (isVerifyPassword) {
      return this.generateTokens({ username: user.username });
    }

    throw new HttpException(
      'Логин или пароль некорректы',
      HttpStatus.BAD_REQUEST,
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

  public checkToken({ token }: { token: string }) {
    try {
      return Boolean(this.jwtService.verify(token).sub);
    } catch {
      return false;
    }
  }
}
