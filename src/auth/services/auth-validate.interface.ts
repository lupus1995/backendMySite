import { ValidationError } from 'class-validator';

/**
 * вспомогательный класс для того, чтобы в модуле каждого сервиса прописать
 * две обязательные функции валидации
 *
 * от динамического типизирования отказался, потому что не смог
 * придумать как подружить несколько классов, которые заранее прописаны
 * в функциях, если оставить типизированные - в этом случае вылетает синтаксическая ошибка
 */
export abstract class AuthValidate {
  // валидация создания пользователя
  abstract validateSignup({
    user,
  }): ValidationError[] | Promise<ValidationError[]>;
  // валидация авторизации пользователя
  abstract validateLogin(arg: unknown): Promise<ValidationError[]>;
}
