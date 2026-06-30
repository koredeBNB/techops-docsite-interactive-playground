# TechOps Docsite Interactive Playground

A small static React + Vite app that lets readers try the mock BSC
APIs and see the responses documented in the documentation.
The responses are simulated client-side, mirroring
`mock-bsc-app/src/mock_bsc_app/validators.py` and `mock-bsc-app/src/mock_bsc_app/gas_fees.py` — there is no backend.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/techops-docsite-interactive-playground/
npm run build    # static output in dist/
npm run preview
```

## Deep links

The selected validator id or network is stored in the URL, so docs can link to a specific
state:

```
.../techops-docsite-interactive-playground/?validator=validator-1
.../techops-docsite-interactive-playground/?network=bnb-smart-chain
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and
publishes `dist/` to GitHub Pages at
`https://koredebnb.github.io/techops-docsite-interactive-playground/`.
The Vite `base` path in `vite.config.ts` must match the repository name.