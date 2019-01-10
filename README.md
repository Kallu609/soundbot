# Soundbot

Telegram bot which you can send sound to and share with others.

## Requirements

- Node.js
- PostgreSQL database

## Installation & running

1. Make copy of `.env.example` to `.env`. Fill it with your own details.
2. Run following commands:

```
npm install
npm run start
```

## Environment variables

| Key                | Explanation                                    |
| ------------------ | ---------------------------------------------- |
| BOT_TOKEN          | Your Telegram bot token                        |
| SECRET_KEY         | Your super secret key (this can be any string, needed for export/import of sounds)|
| PG_HOST            | PostgreSQL host                                |
| PG_DATABASE        | PostgreSQL database name                       |
| PG_USER            | PostgreSQL username                            |
| PG_PASSWORD        | PostgreSQL password                            |
