# Allure TestOps MCP

Production-ready MCP server for Allure TestOps focused on test cases, launches, test results, and test plans.

## Features

- JWT bearer auth exchange from user API token, with in-memory caching and refresh on expiry.
- Project-aware tools with optional default project via `ALLURE_PROJECT_ID`.
- Project resolution by `projectId` or `projectName` for project-scoped operations.
- Test case custom field support, including lookup and updates.
- `stdio` transport for local MCP clients (`npx` or local build).

## Tool Coverage

- Test cases: list, search, get, create, update, delete, restore, overview, history, scenario, tags, issues, custom fields
- Launches: list, search, get, create, update, delete, close, reopen, statistics, progress, add test cases/plans
- Test results: list, search, get, create, update, history, assign, resolve
- Test plans: list, get, create, update, delete, run

## User Usage Docs

User-focused runtime and integration docs are in [`docs/usages/`](./docs/usages/):

- [`docs/usages/README.md`](./docs/usages/README.md)
- [`docs/usages/docker.md`](./docs/usages/docker.md)
- [`docs/usages/npx.md`](./docs/usages/npx.md)
- [`docs/usages/running-locally.md`](./docs/usages/running-locally.md)
- [`docs/usages/integrations.md`](./docs/usages/integrations.md)
- [`docs/usages/examples/README.md`](./docs/usages/examples/README.md)
- [`docs/usages/examples/test-cases.md`](./docs/usages/examples/test-cases.md)
- [`docs/usages/examples/launches.md`](./docs/usages/examples/launches.md)
- [`docs/usages/examples/test-results.md`](./docs/usages/examples/test-results.md)
- [`docs/usages/examples/test-plans.md`](./docs/usages/examples/test-plans.md)
- [`docs/usages/examples/custom-fields.md`](./docs/usages/examples/custom-fields.md)
- [`docs/usages/examples/workflows.md`](./docs/usages/examples/workflows.md)

## Tool Catalog (GitHub Pages)

The auto-generated MCP tool catalog is published via GitHub Pages:

- https://armanayvazyan.github.io/allure-testops-mcp/

The page content is generated from source tool definitions. When a new tool is added to `src/tools/*.ts`, the Pages workflow regenerates `docs/tools.json` and updates the site automatically.

## Authentication

This server follows the Allure TestOps API guide:

1. Use your user-generated API token in `ALLURE_TOKEN`.
2. Server exchanges it at `/api/uaa/oauth/token`.
3. Received bearer JWT is cached and reused until near expiry.

Reference: https://docs.qameta.io/allure-testops/advanced/api/

## Environment Variables

```bash
ALLURE_TESTOPS_URL=https://allure-testops.instance.com/
ALLURE_TOKEN=your-api-token
# Optional default project:
# ALLURE_PROJECT_ID=37
```

- `ALLURE_TESTOPS_URL` required
- `ALLURE_TOKEN` required
- `ALLURE_PROJECT_ID` optional

If `ALLURE_PROJECT_ID` is not set, tools that require project scope must receive:
- `projectId`, or
- `projectName` (resolved via `/api/project/suggest`)

## Run Locally

### Prerequisites

- Node.js v18+ and npm

### Step-by-step

1) Clone the repository:

```bash
git clone https://github.com/armanayvazyan/allure-testops-mcp.git
cd allure-testops-mcp
```

2) Install dependencies:

This server follows the Allure TestOps API guide:

1. Use your user-generated API token in `ALLURE_TOKEN`.
2. Server exchanges it at `/api/uaa/oauth/token`.
3. Received bearer JWT is cached and reused until near expiry.

Reference: https://docs.qameta.io/allure-testops/advanced/api/

3) Create your local environment file from the example and fill required values:

```bash
cp .env.example .env
```

Set:
- `ALLURE_TESTOPS_URL` (required)
- `ALLURE_TOKEN` (required)
- `ALLURE_PROJECT_ID` (optional default project)

4) Build the project:

```bash
npm run build
```

5) Start the MCP server from the compiled output:

```bash
npm start
```

6) Optional: run in development mode (TypeScript via `tsx`):

```bash
npm run dev
```

7) Optional: run integration smoke checks:

```bash
npm run test:integration
```

## MCP Client Setup

Use one of these server commands:

- Local build:
  - `command`: `node`
  - `args`: `["/absolute/path/to/allure-testops-mcp/dist/index.js"]`
- `npx` (GitHub spec):
  - `command`: `npx`
  - `args`: `["-y", "github:armanayvazyan/allure-testops-mcp"]`
- `npx` (npm package, when published):
  - `command`: `npx`
  - `args`: `["-y", "allure-testops-mcp"]`
Common config block:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "npx",
      "args": ["-y", "github:armanayvazyan/allure-testops-mcp"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://allure-testops.instance.com",
        "ALLURE_TOKEN": "your-api-token",
        "ALLURE_PROJECT_ID": "37"
      }
    }
  }
}
```

### Claude Desktop

- Open Claude Desktop MCP settings and add the `mcpServers` JSON entry above.
- Restart Claude Desktop after saving config.

### Claude Code

- Add the same `mcpServers` entry in your Claude Code MCP configuration.
- Restart your Claude Code session to load the server.

### Cursor

- Open Cursor MCP settings and add the same `mcpServers` entry.
- Restart Cursor (or reload MCP servers) after saving.

### Other MCP Clients

Any MCP client that supports `stdio` servers can use this project with the same command/env configuration.

## CI and Quality Gates

This repository includes GitHub Actions checks for pushed code and pull requests:

- compile (`npm run build`)
- lint (`npm run lint`)

CI workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

## Review and Merge Policy

The repository uses code ownership with `@armanayvazyan`:

- [`.github/CODEOWNERS`](.github/CODEOWNERS)
- [`.github/workflows/auto-review-request.yml`](.github/workflows/auto-review-request.yml) auto-requests `@armanayvazyan` on new PRs

To require approval before merge, enable branch protection on your default branch with:

1. Require a pull request before merging
2. Require approvals
3. Require review from Code Owners
4. Require status checks to pass (`CI / checks`)

## OSS Automation

Included automation for typical open-source maintenance:

- Dependabot updates: [`.github/dependabot.yml`](.github/dependabot.yml)
- Stale issue/PR triage: [`.github/workflows/stale.yml`](.github/workflows/stale.yml)
- Release notes drafting: [`.github/workflows/release-drafter.yml`](.github/workflows/release-drafter.yml)

## Integration Smoke Test

```bash
ALLURE_TESTOPS_URL="https://allure-testops.instance.com/" \
ALLURE_TOKEN="your-api-token" \
ALLURE_PROJECT_ID="37" \
npm run test:integration
```

## Public Project Docs

- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)
