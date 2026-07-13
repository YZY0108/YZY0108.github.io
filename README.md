# Yuan Zhiyi — Portfolio

A small, dependency-free portfolio for quantitative research, machine learning, and selected public projects.

## Information architecture

- `index.html` — concise landing page and selected work
- `work.html` — experience, capabilities, and research process
- `projects.html` — filterable public project case studies
- `profile.html` — biography, education, awards, and milestones
- `404.html` — GitHub Pages fallback

Shared styles and behavior live in `style.css` and `script.js`. Images and award evidence remain in `assets/`.

## Run locally

No install or build step is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The repository is designed for GitHub Pages to publish directly from the default branch. Relative links keep every page usable locally and on `https://yzy0108.github.io`.

## Editing content

Keep project descriptions outcome-first:

1. Name the problem.
2. Explain the important design choice.
3. Show how the result was validated.
4. Link to reproducible public evidence.

Private repository details should not be added to the public portfolio.
