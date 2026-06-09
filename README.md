# ИЖСИЗ — демо-прототип нового сайта

Демонстрация для заказчика: как может выглядеть сайт после переноса с [Tilda (lifeinstitute.ru)](https://lifeinstitute.ru/).

## Что внутри

| Файл | Описание |
|------|----------|
| `index.html` | Главная страница — hero, слайдер отзывов, каталог программ |
| `individual-consultations.html` | Страница консультаций (как на [lifeinstitute.ru/individual-consultations](https://lifeinstitute.ru/individual-consultations)) |
| `psychological-help.html` | **Новая страница из ТЗ** — NLP-инструменты + ИИ-разбор |

## Как открыть локально

```bash
cd demo
python3 -m http.server 8080
```

Откройте в браузере: **http://localhost:8080**

## Деплой на Vercel

1. Создайте репозиторий на GitHub и запушьте код:
   ```bash
   git remote add origin https://github.com/ВАШ_АККАУНТ/izhsiz-demo.git
   git push -u origin main
   ```
2. На [vercel.com](https://vercel.com) → **Add New Project** → импортируйте репозиторий.
3. Настройки подставятся из `vercel.json` автоматически (build: `npm run build`, output: `dist`).
4. Нажмите **Deploy**.

Альтернатива без GitHub: в Vercel CLI — `npx vercel demo` из корня проекта.

## Что показать заказчику

1. **Главная** — тот же стиль (шрифты Unbounded + Montserrat, цвета #3b3758, кремовый фон), слайдер отзывов
2. **Консультации** — полная воронка: запросы → форматы → шаги → квиз → специалисты → FAQ
3. **Психологическая помощь** — новый функционал из ТЗ, который на Tilda не реализуется

## Это демо, не финальный продукт

- Картинки и логотип — с текущего Tilda-сайта
- Формы и оплата — заглушки (alert)
- Финальная версия — Next.js + бэкенд для ИИ-инструментов
