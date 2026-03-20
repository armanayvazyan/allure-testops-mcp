# Usage via NPX

Use this option when you want zero local build setup and prefer launching the server directly with `npx`.

## Required Environment Variables

```bash
ALLURE_TESTOPS_URL=https://your-allure-instance.com
ALLURE_TOKEN=your-api-token
# Optional:
# ALLURE_PROJECT_ID=37
```

## MCP Server Command

Preferred for direct GitHub source execution:

```json
{
  "command": "npx",
  "args": ["-y", "github:armanayvazyan/allure-testops-mcp#v1.0.0"],
  "env": {
    "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
    "ALLURE_TOKEN": "your-api-token",
    "ALLURE_PROJECT_ID": "37"
  }
}
```

Alternative (when the package is published to npm):

```json
{
  "command": "npx",
  "args": ["-y", "allure-testops-mcp@1.0.0"],
  "env": {
    "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
    "ALLURE_TOKEN": "your-api-token",
    "ALLURE_PROJECT_ID": "37"
  }
}
```

## Notes

- For GitHub source installs, pin to a Git tag or commit with `#` (for example `#v1.0.0`), not `:`.
- Create matching release tags (`vX.Y.Z`) so users can pin stable versions.
- Keep `ALLURE_TOKEN` as a user-generated API token.
- `ALLURE_PROJECT_ID` is optional; otherwise provide `projectId` or `projectName` in project-scoped tools.
