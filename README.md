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