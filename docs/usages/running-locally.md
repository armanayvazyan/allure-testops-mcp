# Usage via Local Run

Use this option when you want to run the server from local source code.

## Prerequisites

- Node.js 18+
- npm

## 1) Install and Build

```bash
npm install
npm run build
```

## 2) Set Environment Variables

```bash
export ALLURE_TESTOPS_URL="https://your-allure-instance.com"
export ALLURE_TOKEN="your-api-token"
# Optional:
export ALLURE_PROJECT_ID="37"
```

## 3) Run

Production build:

```bash
npm start
```

Development mode:

```bash
npm run dev
```

## MCP Server Command (Local Build)

```json
{
  "command": "node",
  "args": ["/absolute/path/to/allure-testops-mcp/dist/index.js"],
  "env": {
    "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
    "ALLURE_TOKEN": "your-api-token",
    "ALLURE_PROJECT_ID": "37"
  }
}
```
