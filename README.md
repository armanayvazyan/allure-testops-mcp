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

## Authentication

This server follows the Allure TestOps API guide:

1. Use your user-generated API token in `ALLURE_TOKEN`.
2. Server exchanges it at `/api/uaa/oauth/token`.
3. Received bearer JWT is cached and reused until near expiry.

Reference: https://docs.qameta.io/allure-testops/advanced/api/

## Environment Variables

```bash
ALLURE_TESTOPS_URL=https://allure-testops.labs.jb.gg/
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

```bash
npm install
npm run build
npm start
```

For local development:

```bash
npm run dev
```

## MCP Client Setup

Use one of these server commands:

- Local build:
  - `command`: `node`
  - `args`: `["/absolute/path/to/allure-testops-mcp/dist/index.js"]`
- `npx`:
  - `command`: `npx`
  - `args`: `["-y", "allure-testops-mcp"]`

Common config block:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "npx",
      "args": ["-y", "allure-testops-mcp"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://allure-testops.labs.jb.gg/",
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

## Temporary Smoke Test

```bash
ALLURE_TESTOPS_URL="https://allure-testops.labs.jb.gg/" \
ALLURE_TOKEN="your-api-token" \
ALLURE_PROJECT_ID="37" \
npm run temp:test
```

## Public Project Docs

- [Contributing](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)
