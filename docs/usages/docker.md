# Usage via Docker

Use this option when you want an isolated runtime and no local Node.js dependency for execution.

## Run the Image with MCP stdio

```bash
docker run -i --rm \
  -e ALLURE_TESTOPS_URL=https://your-allure-instance.com \
  -e ALLURE_TOKEN=your-api-token \
  -e ALLURE_PROJECT_ID=37 \
  armanayvazyan/allure-testops-mcp:latest
```

## MCP Server Command (Docker)

```json
{
  "command": "docker",
  "args": [
    "run",
    "-i",
    "--rm",
    "-e",
    "ALLURE_TESTOPS_URL=https://your-allure-instance.com",
    "-e",
    "ALLURE_TOKEN=your-api-token",
    "-e",
    "ALLURE_PROJECT_ID=37",
    "armanayvazyan/allure-testops-mcp:latest"
  ]
}
```

## Notes

- Keep the `-i` flag; MCP stdio requires interactive stdin.
- If you do not set `ALLURE_PROJECT_ID`, pass `projectId` or `projectName` to project-scoped tools.
- For advanced Docker operations (build/publish/troubleshooting), see [`DOCKER.md`](../../DOCKER.md).
