# AI Task Manager (Junior)

Это моя практическая работа по Full-Stack.  
Тут я сделал простой менеджер задач:

- Backend на Node.js + Express
- Frontend на React + JavaScript
- База данных PostgreSQL
- Python-скрипт для выгрузки задач в CSV

## Что умеет проект

- создать задачу (`title`, `description`)
- посмотреть все задачи
- поменять статус задачи (`new`, `in_progress`, `done`)
- удалить задачу
- выгрузить задачи в CSV через Python

## Структура проекта

- `backend/` - API на Express
- `frontend/` - React-приложение
- `database/` - SQL-скрипт для таблицы
- `python/` - скрипт экспорта задач

## Описание файлов

### Корень проекта

| Файл | Назначение |
|------|------------|
| `docker-compose.yml` | Оркестрация всех сервисов (БД, backend, frontend, python-export) через Docker |
| `.env.example` | Шаблон переменных окружения для Docker Compose (нужно скопировать в `.env`) |
| `.gitignore` | Исключает из git: `.env`, `node_modules/`, `dist/`, `__pycache__`, CSV-файл |
| `README.md` | Документация проекта |

### `database/`

| Файл | Назначение |
|------|------------|
| `init.sql` | SQL-скрипт создания таблицы `tasks` с полями `id`, `title`, `description`, `status`, `created_at` |

### `backend/`

| Файл | Назначение |
|------|------------|
| `Dockerfile` | Образ для сборки backend-контейнера на базе `node:lts-alpine` |
| `package.json` | Зависимости Node.js: `express`, `pg`, `cors`, `dotenv` |
| `src/server.js` | Точка входа — запускает HTTP-сервер на порту из конфига |
| `src/app.js` | Настройка Express: подключение CORS, JSON-парсера, роутов и middleware ошибок |
| `src/config/env.js` | Загрузка и валидация переменных окружения (`PORT`, `DATABASE_URL`, `CORS_ORIGIN`) |
| `src/config/db.js` | Пул соединений с PostgreSQL через `pg.Pool` |
| `src/routes/index.js` | Корневой роутер: `/health` и подключение `/tasks` |
| `src/routes/taskRoutes.js` | Роуты задач: `POST /`, `GET /`, `PUT /:id`, `DELETE /:id` |
| `src/controllers/taskController.js` | Обработчики HTTP-запросов — принимают `req/res`, вызывают сервис, передают ошибки в `next` |
| `src/services/taskService.js` | Бизнес-логика: валидация входных данных, SQL-запросы к БД |
| `src/validators/taskValidators.js` | Чистые функции валидации: `title`, `id`, `status` |
| `src/utils/ApiError.js` | Кастомный класс ошибки с полем `statusCode` для различения HTTP-статусов |
| `src/middlewares/errorHandler.js` | Централизованный обработчик ошибок: возвращает JSON с кодом и сообщением |
| `src/middlewares/notFound.js` | Возвращает 404 для всех неизвестных маршрутов |

### `frontend/`

| Файл | Назначение |
|------|------------|
| `Dockerfile` | Двухэтапная сборка: `node:lts-alpine` собирает Vite-bundle, `nginx:alpine` раздаёт статику |
| `nginx.conf` | Конфиг Nginx: `try_files` для SPA-роутинга |
| `package.json` | Зависимости: `react`, `react-dom`, `vite` |
| `index.html` | Корневой HTML-файл Vite |
| `src/main.jsx` | Точка входа React — монтирует `<App />` в DOM |
| `src/App.jsx` | Корневой компонент: управляет состоянием задач, обрабатывает все события |
| `src/api/tasksApi.js` | API-слой: функции `fetchTasks`, `createTask`, `updateTaskStatus`, `deleteTask` |
| `src/components/TaskForm.jsx` | Форма создания задачи с полями `title` и `description` |
| `src/components/TaskTable.jsx` | Таблица задач: статус через `<select>`, кнопка удаления с подтверждением |
| `src/styles.css` | Глобальные стили приложения |

### `python/`

| Файл | Назначение |
|------|------------|
| `Dockerfile` | Образ на базе `python:3.12-slim` для запуска скрипта экспорта |
| `export_tasks.py` | Подключается к PostgreSQL, выгружает все задачи и сохраняет в CSV-файл |
| `requirements.txt` | Зависимости Python с зафиксированными версиями: `psycopg`, `python-dotenv` |

## Запуск через Docker (рекомендуется)

Самый простой способ запустить весь проект одной командой.

### Требования

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (включает Docker Compose)

### Шаги

**1) Создать файл `.env` в корне проекта:**

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Открыть `.env` и задать пароль для PostgreSQL:

```
POSTGRES_PASSWORD=придумайте_пароль
```

**2) Установить зависимости и собрать frontend локально:**

```bash
cd backend && npm install && cd ../frontend && npm install && npm run build && cd ..
```

> Зависимости устанавливаются локально и копируются в контейнер при сборке.

**3) Собрать образы и запустить все сервисы:**

```bash
docker compose up --build
```

После запуска:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

**4) Проверить запущенные контейнеры:**

```bash
docker ps
```

Должны отображаться три контейнера: `db`, `backend`, `frontend`.

**5) Посмотреть логи backend:**

```bash
docker compose logs backend
```

**6) Запустить Python-экспорт задач в CSV:**

```bash
cd python
python -m pip install -r requirements.txt
python export_tasks.py
```

CSV-файл появится в папке `python/tasks_export.csv`.

**7) Остановить проект:**

```bash
docker compose down
```

Для полной очистки (включая данные БД):

```bash
docker compose down -v
```

---

## Запуск без Docker (ручной способ)

## Что нужно установить

- Node.js (лучше LTS версия)
- npm
- Python 3.10+ (у меня запускалось на 3.14)
- PostgreSQL 14+

## 1) Подготовка базы данных

Создать БД (например `task_manager`) и выполнить скрипт:

`database/init.sql`

В нем создается таблица `tasks` с полями:
`id`, `title`, `description`, `status`, `created_at`.

## 2) Запуск Backend

Перейти в папку backend:

```bash
cd backend
```

Скопировать env-шаблон:

```bash
cp .env.example .env
```

Если у вас Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Установить зависимости и запустить:

```bash
npm install
npm run dev
```

Backend по умолчанию: `http://localhost:5000`

Проверка health:

- `GET http://localhost:5000/health`

## 3) Запуск Frontend

Перейти в папку frontend:

```bash
cd frontend
```

Скопировать env-шаблон:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Установить зависимости и запустить:

```bash
npm install
npm run dev
```

Frontend по умолчанию: `http://localhost:5173`

## 4) Запуск Python-экспорта

Перейти в папку python:

```bash
cd python
```

Создать `.env` на основе примера:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Установить зависимости:

```bash
pip install -r requirements.txt
```

Запуск скрипта:

```bash
python export_tasks.py
```

После запуска создается CSV-файл (по умолчанию `tasks_export.csv`).
Если запускать скрипт из корня проекта, файл появится в корне.

## Примеры API

### Создать задачу

`POST /tasks`

Пример body:

```json
{
  "title": "Сделать домашку",
  "description": "Доделать этапы проекта"
}
```

### Получить список задач

`GET /tasks`

### Обновить статус

`PUT /tasks/:id`

Пример body:

```json
{
  "status": "done"
}
```

### Удалить задачу

`DELETE /tasks/:id`

## Переменные окружения

### Backend (`backend/.env`)

- `PORT=5000`
- `DATABASE_URL=postgresql://postgres:<ваш_пароль>@localhost:5432/task_manager`

### Frontend (`frontend/.env`)

- `VITE_API_BASE_URL=http://localhost:5000`

### Python (`python/.env`)

- `DATABASE_URL=postgresql://postgres:<ваш_пароль>@localhost:5432/task_manager`
- `EXPORT_CSV_PATH=tasks_export.csv`

## По git

Я старался делать понятные коммиты по этапам (БД, backend, frontend, python, README),  
чтобы было легче проверять проект и смотреть историю.