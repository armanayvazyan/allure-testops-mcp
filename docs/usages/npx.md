# Usage via NPX

Use this option when you want zero local build setup and prefer launching the server directly from npm.

## Required Environment Variables

```bash
ALLURE_TESTOPS_URL=https://your-allure-instance.com
ALLURE_TOKEN=your-api-token
# Optional:
# ALLURE_PROJECT_ID=37
```

## MCP Server Command

```json
{
  "command": "npx",
  "args": ["-y", "allure-testops-mcp"],
  "env": {
    "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
    "ALLURE_TOKEN": "your-api-token",
    "ALLURE_PROJECT_ID": "37"
  }
}
```

## Notes

- Keep `ALLURE_TOKEN` as a user-generated API token.
- `ALLURE_PROJECT_ID` is optional; otherwise provide `projectId` or `projectName` in project-scoped tools.
