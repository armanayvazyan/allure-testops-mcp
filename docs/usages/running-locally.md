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

## Local Debug UI

Start a browser-based chatbot UI for calling MCP tools and inspecting requests and responses:

```bash
npm run dev:ui
# Open http://localhost:3333
```

Optionally change the port:

```bash
DEV_UI_PORT=4000 npm run dev:ui
```

The UI lists all available tools. Click a tool, edit the JSON arguments, press **Call**, and inspect the result inline.

Each tool includes ready payload examples:
- **Required payload**: only required schema fields
- **Required + optional payload**: full payload with optional fields filled with sample values
- **Last working example**: the last successful payload you used for that tool

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
