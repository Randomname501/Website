# Website

My personal site — [sreddy.dev](https://sreddy.dev/)

I guess I might as well make a personal website.

## Stack

Plain HTML, CSS, and JavaScript. No framework, no build step, no dependencies —
the files you see are the files that ship. Deployed on Vercel as a static site.

## Local development

```bash
npm run dev   # live-server on http://localhost:3000 with hot reload
```

`npm run dev` uses `npx`, so there's nothing to install first.

## Layout

| File          | What's in it                                                        |
| ------------- | ------------------------------------------------------------------- |
| `index.html`  | The whole page — hero, about, skills, projects, contact              |
| `styles.css`  | All styling; theme colors live in the `:root` block at the top       |
| `script.js`   | Nav scroll state, mobile menu, scroll-spy, fade-in animations        |
| `404.html`    | Not-found page (Vercel serves it automatically)                      |
| `vercel.json` | Security headers, cache policy, clean URLs                           |

## Notes

- Icons are defined once as an SVG `<symbol>` sprite at the top of `index.html`
  and referenced with `<use href="#icon-name">`.
- Animations respect `prefers-reduced-motion`.
- Analytics and Speed Insights scripts are in `index.html` but only report once
  both are enabled for the project in the Vercel dashboard.
