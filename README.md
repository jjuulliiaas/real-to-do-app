🎯 TO DO LIST APP

-> https://www.clipr.cc/F87jM

Інтерактивний менеджер завдань з автентифікацією через AWS Cognito та зберіганням даних у DynamoDB. Клієнтська частина побудована на Vue 3, серверна логіка реалізована через AWS Lambda з використанням Serverless Framework.


🗂 Архітектура проекту:

🖥 frontend/ - Користувацький інтерфейс на Vue 3

⚙️ backend/ - Lambda-функції та конфігурація Serverless

📋 README.md - Документація проекту

🚫 .gitignore - Виключення тимчасових файлів та залежностей


🚄 Розгортання фронтенду:

bash

cd frontend

npm install       # Встановлення залежностей

npm run build    # Збірка проекту

☁️ Готову збірку розміщено у S3-бакеті з налаштуванням статичного хостингу та прискоренням через CloudFront CDN.


⚡ Бекенд: Serverless на AWS:

bash

cd backend

npm install            # Інсталяція необхідних пакетів

npx serverless deploy  # Публікація на AWS

ℹ Використовується Serverless Framework v3 для автоматизації розгортання


🔒 Система безпеки:

✅ Реєстрація нового акаунта

✅ Вхід у систему

✅ Захищений вихід

🔄 Після успішної авторизації Cognito перенаправляє на callback-endpoint, який зберігає ідентифікатор користувача (sub) у localStorage для подальших операцій

📡 API Ендпоїнти:

Базова URL-адреса: https://j4akexqfyd.execute-api.eu-north-1.amazonaws.com/dev


Методи:

1. GET	/getUserTasks	Отримання завдань користувача
   
3. POST	/addTask	Додавання нового завдання
   
5. PUT	/updateTask	Оновлення існуючого завдання
   
7. POST	/deleteTask	Видалення завдання
   
9. GET	/callback	Обробка авторизаційного запиту


🧩 Технологічний стек:

Клієнт: Vue 3 + Vite

Сервер: AWS Lambda

Аутентифікація: Amazon Cognito (Hosted UI)

База даних: DynamoDB

Інфраструктура: CloudFront + S3

Оркестрація: Serverless Framework


👨‍💻 Автор:

Проект не є комерціййною розробкою.

2025©[Julia Sidlovska](https://github.com/jjuulliiaas), KN-32
