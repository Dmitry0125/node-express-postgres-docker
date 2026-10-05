# Simple CRUD REST API (Node.js + PostgreSQL + Docker)

🚀 **REST API для управления блогом/постами.** Проект разработан в изолированном виртуальном окружении с использованием Docker, что позволяет запустить его одной командой на любой машине без предварительной установки Node.js или PostgreSQL в систему.

## 🛠 Технологический стек
* **Backend:** Node.js (v20), Express.js
* **База данных:** PostgreSQL (v15)
* **Инфраструктура:** Docker, Docker Compose
* **Тестирование API:** Thunder Client / Postman

## ✨ Ключевые особенности проекта
* **Полная контейнеризация:** И бэкенд, и база данных работают в изолированных контейнерах Docker.
* **Автоматическая инициализация БД:** При первом запуске Docker самостоятельно создаёт схему таблиц (`01-schema.sql`) и наполняет базу начальными тестовыми данными (`02-seed.sql`).
* **Dev-окружение с автоперезапуском:** Использование флага `--watch` в Node.js позволяет налету обновлять код в контейнере без перезапуска Docker.
* **Безопасность данных:** Данные PostgreSQL сохраняются в локальную директорию `./pgdata` и защищены от потери при остановке контейнеров.

## 📦 Архитектура проекта
```text
www/
├── db-init/
│   ├── 01-schema.sql    # Инициализация таблиц БД
│   └── 02-seed.sql      # Наполнение БД тестовыми данными
├── Dockerfile           # Инструкция сборки Node.js образа
├── docker-compose.yml   # Оркестрация контейнеров Node.js и PostgreSQL
├── index.js             # Главный файл приложения (маршруты и логика)
└── package.json         # Зависимости и скрипты проекта
```

## 🚀 Быстрый запуск

### 1. Клонируйте репозиторий:
```bash
git clone https://github.com
cd ИМЯ_РЕПОЗИТОРИЯ
```

### 2. Запустите проект через Docker Compose:
```bash
docker compose up --build
```
*Команда автоматически соберёт образ Node.js, установит библиотеки `express` и `pg`, поднимет PostgreSQL и применит SQL-скрипты инициализации.*

После успешного запуска API будет доступно по адресу: **`http://localhost:3000`**
База данных доступна с вашего хоста по порту: **`5433`** (пользователь: `postgres`, пароль: `postgres`).

---

## 🛰 Документация API (Эндпоинты)

### 1. Получить все посты (Сортировка от новых к старым)
* **Метод:** `GET`
* **URL:** `http://localhost:3000/`
* **Ответ (200 OK):**
  ```json
  [
    {
      "id": 1,
      "title": "Google is cool",
      "anons": "Google is company",
      "full_text": "Google is big company"
    }
  ]
  ```

### 2. Добавить новый пост
* **Метод:** `POST`
* **URL:** `http://localhost:3000/posts/add`
* **Тело запроса (JSON):**
  ```json
  {
    "title": "Facebook is cool",
    "anons": "Facebook is company",
    "full_text": "Facebook is big company"
  }
  ```
* **Ответ (200 OK):** `Post added successfully`

### 3. Удалить пост по ID
* **Метод:** `DELETE`
* **URL:** `http://localhost:3000/posts/:id`
* **Пример:** `http://localhost:3000/posts/1`
* **Ответ (200 OK):** `Post deleted successfully`

---

## 🛠 Команды для разработки

* **Остановка проекта:** `docker compose down`
* **Полный сброс базы данных (для применения новых SQL скриптов):**
  1. `docker compose down`
  2. Удалить папку `pgdata/`
  3. `docker compose up --build`

---

## 🙋‍♂️ Контакты
* **Автор:** Dmitry
* **Telegram:** [@x005ohi]
* **Email:** bagaevdmitriym@gmail.com
