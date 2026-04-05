# Лендинг: K-pop танцы (Москва)

Одностраничный сайт на [Vite](https://vite.dev/) и [Tailwind CSS v4](https://tailwindcss.com/).

## Запуск

```bash
npm install
npm run dev
```

Сборка для публикации:

```bash
npm run build
```

Готовые файлы — в папке `dist`. Загрузите её на Netlify, Vercel, GitHub Pages или любой статический хостинг.

## Медиафайлы

Фото и видео для сайта лежат в [`public/media/`](public/media/) (копия содержимого папки `media/` в корне проекта). После добавления новых файлов в `media/` скопируйте их в `public/media/`, чтобы они открывались по адресу `/media/...`.

## Что править

- **Контакты, цены, расписание, списки фото, видео:** [`src/site.config.ts`](src/site.config.ts)
  - Для индивидуальных занятий задайте `individualHourRub` числом или оставьте `null`.
  - Фоновое видео: `media.videoSources` — в git только **MP4** (лимит GitHub 100 MB). Файлы `*.MOV` в `.gitignore`; для продакшена загрузите видео на хостинг/CDN при необходимости.
- **SEO и превью в соцсетях:** в [`index.html`](index.html) обновите `og:url`, `og:image` (полный URL с вашим доменом) и при необходимости заголовки в `<title>` / `meta description`, чтобы они совпадали с `site.config.ts`.

## Стек

TypeScript, Vite 8, Tailwind 4 (`@tailwindcss/vite`).
