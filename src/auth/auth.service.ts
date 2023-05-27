import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthRepository } from 'src/utils/repositories/auth.repository';
import { TokensService } from 'src/utils/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly authRepository: AuthRepository,
  ) {}

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

    return this.tokensService.generateTokens({ username: user.username });
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
      return this.tokensService.generateTokens({ username: user.username });
    }

    throw new HttpException(
      'Логин или пароль некорректы',
      HttpStatus.BAD_REQUEST,
    );
  }
}
