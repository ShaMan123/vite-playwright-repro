## Vite Playwright Repro

### Setup

```bash
npm i # OR npm ci
npx playwright install --with-deps chromium
```

Make sure the [postinstall](./cert/createSelfSignedCert.sh) created the [self signed certificate](./cert/cert.pem).
If not run:

```bash
npm run postinstall
```

### dev

```bash
npm run dev
npm test
```

### preview

```bash
npm run preview
npm test
```

### serve

```bash
npm run serve
npm test
```
