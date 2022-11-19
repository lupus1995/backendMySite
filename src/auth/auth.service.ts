import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as argon2 from "argon2";
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        @InjectConnection() private readonly connection: Connection,
    ) { }

    private generateTokens({ username }: { username: string }) {
        const accessToken = this.jwtService.sign({ sub: username }, { expiresIn: '120s' });
        const refreshToken = this.jwtService.sign({ sub: username }, { expiresIn: '1800s' });

        return { accessToken, refreshToken }
    }

    /**
     * поиск уникального пользователя по имени
     */
    async uniqUsername({ username }: { username: string }) {
        return await this.userModel.findOne({ username }).exec();
    }

    /**
     * регистрация пользователя
     */
    async signup(user: SignUpDto): Promise<{ accessToken: string; refreshToken: string; }> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const newUserModel = {
                ...user,
                password: await argon2.hash(user.password),
            }
            const model = new this.userModel(newUserModel);

            await model.save();
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw new HttpException('Ошибка регистрации пользователя', HttpStatus.BAD_REQUEST);
        } finally {
            session.endSession();
        }

        return this.generateTokens({ username: user.username });

    }

    /**
     * авторизация пользователя
     */
    async login({ username, password }: { username: string; password: string }) {
        try {
            const user = await this.uniqUsername({ username });
            const isVerifyPassword = await argon2.verify(user.password, password)
            if (isVerifyPassword) {
                return this.generateTokens({ username: user.username });
            }

            throw new HttpException('Логин или пароль некорректы', HttpStatus.BAD_REQUEST);
        } catch (e) {
            throw new HttpException('Логин или пароль некорректы', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * обновление токенов
     */
    async refreshTokens({ token }: { token: string }) {
        try {
            const username = this.jwtService.verify(token).sub;
            if (username) {
                return this.generateTokens({ username });
            }

            throw new HttpException('Для просмотра страницы необходимо авторизоваться', HttpStatus.FORBIDDEN);
        } catch {
            throw new HttpException('Для просмотра страницы необходимо авторизоваться', HttpStatus.FORBIDDEN);
        }

    }

    async checkToken({ token }: { token: string }) {
        try {
            return Boolean(this.jwtService.verify(token).sub);
        } catch {
            return false;
        }

    }
}
