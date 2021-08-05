# Swimlanes

Swimlanes is a simple task board that never transmits your data. Your lanes and
notes are cached client-side using `localStorage`, and you can export a backup
for extra control.

Try the app out at [github.io/swimlanes](https://taylor-edwards.github.io/swimlanes/)

## Local development

NextJS includes a local development server with hot reloading. To get started,
first install the project's dependencies then run the dev script.

```bash
npm install
npm run dev
```

After compiling, the app should be available at
[localhost:3000/swimlanes](http://localhost:3000/swimlanes/)

## Publishing

Swimlanes is currently hosted on GitHub Pages. Deployment involves building and
exporting static assets to the `/docs` directory then committing and pushing
the results to GitHub on the `main` branch.

```bash
npm run build
npm run export
```

The app should update within a few minutes at
[github.io/swimlanes](https://taylor-edwards.github.io/swimlanes/)
