FROM node:20-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем библиотеки прямо при сборке образа
RUN npm install

# Копируем остальной код (включая index.js)
COPY . .

EXPOSE 3000

# Команда по умолчанию (будет переопределена в compose для dev-режима)
CMD ["node", "index.js"]
