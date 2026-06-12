# sohaibirfann.github.io

My personal site — a portfolio and a virtual photography gallery in one.

> Work in progress — still adding content and polishing.

**Live:** https://sohaibirfann.github.io

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

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## License

Code is [MIT](./LICENSE). The photography is all rights reserved — please ask
before using it.
