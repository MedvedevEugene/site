# Админ-панель и база данных

Своя админка без платной CMS: `/admin`

## Быстрый старт (локально)

```bash
docker compose up -d
cp .env.example .env.local
npm install
npx prisma db push
npm run db:seed
npm run dev
```

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin
- Расписание: http://localhost:3000/timetable

## Разделы админки

| Раздел | Путь | Что редактирует клиент |
|--------|------|------------------------|
| Расписание | `/admin/events` | События: дата, время, ведущий, онлайн/очно |
| Новости | `/admin/news` | Статьи блога |
| Тарифы | `/admin/tariffs` | Цены и описания на странице консультаций |
| Фото | `/admin/media` | URL изображений на сайте |

## Vercel + Neon (бесплатно)

1. [neon.tech](https://neon.tech) → создать проект → скопировать `DATABASE_URL`
2. Vercel → Settings → Environment Variables:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET`
3. Локально один раз:
   ```bash
   DATABASE_URL="postgresql://..." npx prisma db push
   DATABASE_URL="postgresql://..." npm run db:seed
   ```
