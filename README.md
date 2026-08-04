# Mot Web Services — English

The fully independent English storefront for Mot Web Services. It includes an OGAds-powered CPA offer feed, legal pages, and an original English blog.

## Local development

Copy `.env.example` to `.env.local`, provide credentials for the English production services, then run:

```bash
npm ci
npm run dev
```

## Deployment

The OpenNext build targets Cloudflare Workers. Set the `OGADS_API_KEY` Worker secret before deployment; the key is used only by the server-side offer proxy and is never exposed to browsers.

```bash
npm run build
npm run deploy
```
