# WhatsApp User Interface

Пользовательский интерфейс для отправки и получения текстовых сообщений через WhatsApp с использованием сервиса [GREEN-API](https://green-api.com/). Интерфейс приближен к веб-версии WhatsApp.

## Основные функции

- **Авторизация**: Вход с использованием `idInstance` и `apiTokenInstance` из системы GREEN-API.
- **Создание чата**: Ввод номера телефона для создания нового чата.
- **Отправка сообщений**: Отправка текстовых сообщений в выбранный чат.
- **Получение сообщений**: Получение и отображение входящих сообщений в реальном времени.
- **Адаптивный дизайн**: Интерфейс адаптирован для мобильных устройств и десктопов.
- **Оповещения**: Уведомления об ошибках отправки сообщений с использованием `react-toastify`.

## Как использовать

**Авторизация**:

- Введите idInstance и apiTokenInstance из системы GREEN-API и нажмите Войти.

**Создание чата:**

- Введите номер телефона в формате 79111234567 и нажмите "Создать чат".

**Отправка сообщений:**

- Введите текст сообщения в поле ввода и нажмите кнопку отправки (➤) или Enter.

**Получение сообщений:**

- Входящие сообщения будут отображаться в реальном времени.

**Выход:**

- Нажмите кнопку "Выйти" для завершения сессии.

## Установка и запуск

- **Зарегистрируйтесь на GREEN-API, создайте авторизованный инстанс и включите входящие сообщения**:

  > Документация
  > https://green-api.com/docs/before-start/#cabinet - регистрация
  > https://green-api.com/docs/before-start/#instance - создание инстанса
  > https://green-api.com/docs/before-start/#qr - авторизация инстанса
  > https://green-api.com/docs/api/receiving/technology-http-api/ - включить входящие сообщения (смотри видео инструкцию), важно включить "Получать уведомления о входящих сообщениях и файлах"

- **Установите зависимости**:

```
npm install
```

- **Создайте `.env` файл и добавьте туда `apiUrl` из инстанса GREEN-API**:

```

VITE_GREEN_API_URL=ваш_урл
```

- **Запустите проект локально**:

```
npm run dev
```

В консоли появится ссылка на localhost проекта

## Технологии

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **react-toastify**
- **Vercel**
