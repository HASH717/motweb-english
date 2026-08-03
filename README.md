# Mot Web Services — English

The fully independent English storefront for Mot Web Services. It includes the store, Canva checkout flow, order tracking, legal pages, and an original English blog.

## Local development

Copy `.env.example` to `.env.local`, provide credentials for the English production services, then run:

```bash
npm ci
npm run dev
```

## Deployment

The OpenNext build targets Cloudflare. The English deployment uses its own Cloudflare application and D1 database. It must also use an English-only Turnstile widget, payment webhook, and secrets.

```bash
npm run build
npm run deploy
```
