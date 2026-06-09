# ИЖСИЗ — сайт института

Новый сайт [lifeinstitute.ru](https://lifeinstitute.ru/) на Next.js 15 + Tailwind CSS.

## Страницы

| URL | Описание |
|-----|----------|
| `/` | Главная |
| `/individual-consultations` | Индивидуальные консультации |
| `/psychological-help` | Психологическая помощь (новая из ТЗ) |
| `/timetable` | Расписание (Google Calendar) |
| `/16-associations`, `/nlu`, `/ptichno-rybko` | NLP-инструменты + ИИ-разбор |
| `/base-cource`, `/business-cource` | Курсы |
| `/rasstanovochnye-gruppy`, `/telese-terapiya` | Новые лендинги из ТЗ |
| `/teachers/[slug]` | Шаблон преподавателя |

Папка [`demo/`](demo/) — первый HTML-прототип для заказчика.

## Локальный запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте http://localhost:3000

## Деплой на Vercel

1. Push в [github.com/MedvedevEugene/site](https://github.com/MedvedevEugene/site)
2. Import на [vercel.com](https://vercel.com)
3. Добавьте переменные из `.env.example` в Settings → Environment Variables

## Расписание для заказчика

Менеджер добавляет события в **Google Calendar** — они автоматически появляются на `/timetable`.

Настройка:
1. Создайте Google Calendar для института
2. В `.env.local`: `GOOGLE_CALENDAR_ID` и `GOOGLE_CALENDAR_API_KEY`
3. Выдайте доступ редактора нужным сотрудникам

## Структура

```
app/           — страницы и API routes
components/    — UI, layout, формы, инструменты
lib/           — константы и конфиг
demo/          — HTML-прототип (legacy)
```
