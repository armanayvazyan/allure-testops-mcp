# Integration Examples

This page shows MCP config examples for Cursor, Claude Code, and Claude Desktop.

All examples assume these environment values:

```json
{
  "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
  "ALLURE_TOKEN": "your-api-token",
  "ALLURE_PROJECT_ID": "37"
}
```

## Cursor

Use this `mcpServers` entry in Cursor MCP settings:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "npx",
      "args": ["-y", "allure-testops-mcp"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
        "ALLURE_TOKEN": "your-api-token",
        "ALLURE_PROJECT_ID": "37"
      }
    }
  }
}
```

## Claude Code

Use the same `mcpServers` structure in Claude Code MCP config:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "npx",
      "args": ["-y", "allure-testops-mcp"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
        "ALLURE_TOKEN": "your-api-token",
        "ALLURE_PROJECT_ID": "37"
      }
    }
  }
}
```

## Claude Desktop

Add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "npx",
      "args": ["-y", "allure-testops-mcp"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
        "ALLURE_TOKEN": "your-api-token",
        "ALLURE_PROJECT_ID": "37"
      }
    }
  }
}
```

## Alternate Runtime Commands

If you prefer other runtimes, replace only `command` and `args`:

- Docker: see [docker.md](./docker.md)
- Local build (`node dist/index.js`): see [running-locally.md](./running-locally.md)
