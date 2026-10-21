# isakanderson.com

My personal site: projects, writing, mini courses, and a bookshelf. Built with SvelteKit 3, Svelte 5, Tailwind CSS 4, shadcn-svelte, and mdsvex, prerendered to static HTML on Cloudflare Pages.

## Developing

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm check      # type-check
pnpm lint       # prettier + eslint
pnpm format     # fix formatting
pnpm build      # production build (.svelte-kit/cloudflare)
```

## Adding content

Everything lives in Markdown files under `src/content/`, with YAML frontmatter at the top. Drop a new file in, and the listings, home page, and RSS feed pick it up. Add `draft: true` to keep a file out of the built site while you work on it (drafts still show in `pnpm dev`).

| What          | Where                                       | Frontmatter                                                                                                                |
| ------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Blog post     | `src/content/posts/my-post.md`              | `title`, `date` (YYYY-MM-DD), `description`, `tags`                                                                        |
| Project       | `src/content/projects/my-app.md`            | `title`, `description`, `status` (`live` / `in progress` / `archived`), `stack`, `url`, `repo`, `video`, `poster`, `order` |
| Course        | `src/content/courses/my-course/index.md`    | `title`, `description`, `order`                                                                                            |
| Course lesson | `src/content/courses/my-course/01-intro.md` | `title`, `description`. The number sets the order and is left out of the URL                                               |
| About page    | `src/content/about.md`                      | none                                                                                                                       |
| Books         | `src/lib/books.ts`                          | `title`, `author`, `isbn` (for the cover), `rating`, `dateRead`; leave out `dateRead` while reading                        |

Site-wide settings (name, tagline, links, analytics) are in `src/lib/site.ts`.

### Videos

Demo videos are served from a public Cloudflare R2 bucket. Set `mediaUrl` in `src/lib/site.ts` to the bucket's public URL (or a custom domain on it), upload files, then refer to them by their path in the bucket:

- On a project: `video: prtytime/demo.mp4` in the frontmatter plays as a short, muted loop.
- In any Markdown page:

  ```svelte
  <script>
  	import Video from '#lib/components/Video.svelte';
  </script>

  <Video src="gear/walkthrough.mp4" loop={false} caption="A tour of my camera bag" />
  ```

  `loop={false}` gives a normal video with sound and controls.

Keep loops short (a few seconds), H.264 MP4, and under a few MB.

### Analytics

Either turn on Web Analytics for the Pages project in the Cloudflare dashboard (no code needed), or paste a Web Analytics token into `cloudflareAnalyticsToken` in `src/lib/site.ts`.

## UI components

shadcn-svelte is configured in `components.json`. Components are copied into `src/lib/components/ui/`, so you own and can restyle them:

```bash
pnpm dlx shadcn-svelte@latest add dialog
```

The theme tokens they use (colors, radius, fonts) are at the top of `src/app.css`.

## Deploying

Cloudflare Pages, with build command `pnpm build` and output directory `.svelte-kit/cloudflare`.
