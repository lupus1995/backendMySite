Авторский блог Александра Панфилова. Это репозиторий для бекенд части моего блога.

Целью блога является публикация моих статей на моем авторском [сайте](https://webforself.ru), а также тестирование своих теорий в вебе, обучение новым технолгиям и практикам на сайте.

Этот репозиторий представляет собой базу по опубликованным статьям, в которых я описываю свой опыт и результаты своих экспериментов. Также на сайте есть раздел с проектами, который будет содержать в себе мои петпроекты и их результат.

## Консольные команды и инструкция по запуску

Для разработки проекта необходимо запустить следующую команду:
```bash
npm run start:dev
```
После ее запуска можно вести разработку проекта.

Для продакшн версии проекта я использую следующие команды
```bash
npm run build

node dist/main.js
```
Первая сделает сборку проекта, вторая - его запустит.

запускает установку husky
```bash
npm run prepare
```

добавляет хук на коммит перед тем как он будет добавлен
```bash
npm run add:pre-commit
```

Команды npm run prepare и npm run add:pre-commit должны быть запущены один раз, после этого их не надо повторно запускать.

## Генерация данных для чата

В приложении есть консольная команда для генерации данных для чата. В нем формируется 50 человек, 1-й человек в списке имеет диалог со всеми остальными. Данные пользователей для входа (логин/пароль) находятся в файле names.txt, сам файл находится в корне проекта.

## Описание проекта

На проекте на стороне бекенда используется фрейморк nestjs. Все рабочие файлы содержатся в папке src. Саму работу роутинга и порядок работы файлов здесь описывать не буду, для этого воспользуйтесь курсами или документацией данного фреймворка. Моя задача: перечислить в данном файле модули, которые использует проект и описать для чего они нужны.

- article - модуль статей, отвечаюший за сущность статей и все что с этим связано;
- auth - модуль авторизации, отвечающий за авторизацию и сессии на юай;
- feedback - модуль обратной связи, отвечающий за сохранение обратной связи от пользователя на сайте и вывод самих отзывов в административной панели;
- main-page - модуль главной страницы, отвечающий за два первых блока на главной странице;
- projects - модуль, отвечающий за превью и короткое описание для моих пет проектов
- schemas - содержит в себе описание коллекций для базы данных. В данный момент на проекте используется база данных mongodb;
- seeder - модуль для запуска контроллеров nestjs в консоле. Ранее такой возможности не было в выбраном мною фреймворке, но благодаря плагину seeder такая возможность появилась. Как добавить seeder в проект и его возможности использования хорошо описаны на его сайте;
- sitemap - модуль, который отвечает за сбор опубликованных статей и проектов, которые на стороне юая генерируют карту сайта для ботов яндекса;
- utils - папка со вспомогательными модулями;
- image - вспомогательный модуль для сохранения, удаления, отдачи картинок на юай в проекте;
- repositories - вспомогательный модуль, отвечающий за общение с базой данных;
- telegram - вспомогательный модуль, отвечающий за публикации ссылок на статьи в телеграм канале;
- tokens - вспомогательный модуль, отвечающий за генерацию, обновление и проверку токенов;
- vk - вспомогательный модуль, отвечающий за публикацию ссылок на статьи в группе вконтакте.

- app - главный модуль в проекте, объединяет в себе все основные модули

## Конфигурационные файлы

- env - константы, которые зависят от окружения. Файл необходимо создать после клонирования проекта с гитхаба. Далее идет список переменных, которые необходимы для работы проекта
- - jwtSecret - секрет, через который будет хешироваться пароль пользователей
- - telegramToken - токен телеграм
- - vkAccessToken - токен вконтакте
- - owner_id - айди группы вк
- - id_telegram_chanel - айди телеграм канала
- - mongooseLink - ссылка на подключение к базе данных mongodb
- - domen - указываем ссылку на статьи в телеграме и вконтакте

- gitignore - игнорирование файлов для публикации на гите;

- nest-cli - настройка управления комманд и консоли для фреймворка nest;

- package.json - скрипты, зависимости для проекта и кратная информация о нем;

- tsconfig - настройка языка программирования typescript;
- eslintrc - файл с описанием правил написания кода на javascript и typescript

- readme - описание проекта и все что с ним связано.
