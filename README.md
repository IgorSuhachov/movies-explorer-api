# Movies Explorer API

Movies Explorer API - это Back-end часть проекта Movies Explorer, отвечающая за хранение данных о пользователях и избранных фильмах.

## Стек технологий

Проект разработан с использованием следующих технологий:

- База данных: MongoDB
- Фреймворк: Express.js
- Сервер: Node.js



## Подключение к MongoDB

Для корректной работы API необходимо подключиться к базе данных MongoDB.

1. Установите и запустите MongoDB. Вы можете скачать MongoDB Community Edition с официального сайта: https://www.mongodb.com/try/download/community

2. Создайте новую базу данных для проекта. Вы можете использовать командную строку MongoDB или GUI-инструменты, такие как MongoDB Compass.

3. В корневой директории проекта, в файле `.env`, укажите строку подключения к вашей базе данных в формате:

   ```env
   MONGODB_URI=mongodb://localhost:27017/ваша_база_данных

   ### Установка и запуск

1. Склонируйте репозиторий: `git clone https://github.com/IgorSuhachov/movies-explorer-api.git`
2. Перейдите в папку проекта: `cd movies-explorer-api`
3. Установите зависимости: `npm install`
4. Запустите сервер: `npm run dev`

## Дополнительная информация

Этот проект был создан в рамках обучения и разработки навыков. Вы можете свободно использовать и модифицировать его в личных или коммерческих целях в соответствии с условиями лицензии.

Front-end часть проекта находится в отдельном репозитории. Вы можете найти её по следующей ссылке: [movies-explorer-frontend](https://github.com/IgorSuhachov/movies-explorer-frontend).

## Автор

GitHub: [IgorSuhachov ](https://github.com/IgorSuhachov/)
