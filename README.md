# sohaibirfann.github.io

My personal site — a portfolio and a virtual photography gallery in one.

> Work in progress — still adding content and polishing.

**Live:** https://sohaibirfann.github.io

## What's here

- **Home** — intro, selected projects, a toolbox of skills, and a short timeline.
- **Projects** — the full list of things I've built, written up by hand.
- **About** — a longer bio and a way to get in touch.
- **Virtual Photography** — screenshots taken inside the games I keep coming
  back to, one gallery per game with a full-screen viewer.

## Editing

The whole site is driven by JSON — I never touch a component to update it:

- `content/site.json` — bio, skills, timeline, links, and the about page.
- `content/projects.json` — projects (the ones marked `featured` also show on the home page).
- `content/games.json` — one entry per photography gallery.
- `content/work.json` — the work timeline.

Images sit alongside in `public/` — project shots in `public/projects/`, and one
folder of screenshots per game in `public/photos/<slug>/` (the galleries pick them
up automatically). Edit a JSON file or drop in new images, rebuild, and the change
shows up on the page.

## Built with

- [Next.js](https://nextjs.org) (App Router, static export)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [image-size](https://github.com/image-size/image-size) — reads shot
  dimensions to lay out the galleries
- Google Fonts via `next/font`

## License

[MIT](./LICENSE)
