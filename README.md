# RepoLens

RepoLens is a responsive repository-health dashboard for engineering teams. It brings technical debt, test coverage, dependency risk and documentation gaps into one focused workspace.

## Features

- Portfolio-level health score and trend
- Technical-debt and test-coverage indicators
- Dependency risk segmentation
- Repository search and risk filters
- Priority issue feed
- CSV report export
- Repository detail and recommended-action views
- Documentation completeness tracking
- Persistent light and dark themes
- Responsive, accessible interface

## Run locally

No build step is required.

```bash
python -m http.server 8080 --directory dist
```

Then open `http://localhost:8080`.

## Project structure

```text
dist/
  index.html
  styles.css
  app.js
```

The current release uses representative sample data. GitHub or GitLab API connectors can be added behind the repository connection flow.

## License

MIT
