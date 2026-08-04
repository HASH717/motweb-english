# Mot Web Services — English

The fully independent English storefront for Mot Web Services. Users enter their Canva email, complete one country-eligible OGAds offer instead of paying DZD 500, and unlock activation only after a verified conversion postback. The project also includes legal pages and an original English blog.

## Local development

Copy `.env.example` to `.env.local`, provide credentials for the English production services, then run:

```bash
npm ci
npm run dev
```

## Deployment

The OpenNext build targets Cloudflare Workers and uses the separate `motweb-english-orders` D1 database. Set `OGADS_API_KEY` and `OGADS_POSTBACK_SECRET` as Worker secrets; neither value is exposed to browsers. Configure OGAds to send `{aff_sub4}`, `{ran}`, and `{offer_id}` to the `/ogads/postback` endpoint.

```bash
npm run build
npm run deploy
```
