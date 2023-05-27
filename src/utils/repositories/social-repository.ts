import { BaseRepository } from './base-repository';

// абстрактный класс для получения данных, которые нужно где-либо опубликовать
export abstract class SocialRepository<T> extends BaseRepository<T> {
  // получение данных для публикации в телеграм
  abstract getByPublichTelegram(): Promise<unknown[]>;

  // получение данных для публикации в вк
  abstract getByPublichVk(): Promise<unknown[]>;
}
