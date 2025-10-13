# Allure TestOps MCP Server

MCP (Model Context Protocol) server for Allure TestOps REST API integration. Provides CRUD operations for test cases, launches, and test plans, including bulk CSV import for test cases.

## Features

- **Test Cases CRUD**: Create, read, update, delete test cases
- **Bulk CSV Import**: Import multiple test cases from CSV files
- **Launches CRUD**: Manage test launches
- **Test Plans CRUD**: Manage test plans
- **Docker Support**: Run as a containerized service

## Prerequisites

- Node.js 20+
- Allure TestOps instance with API access
- API token with appropriate permissions

## Installation

```bash
cd allure-testops-mcp
npm install
```

## Configuration

Create a `.env` file in the project root:

```bash
ALLURE_TESTOPS_URL=https://allure-testops.labs.jb.gg
ALLURE_TOKEN=your-api-token-here
PROJECT_ID=1
```

Get your API token from Allure TestOps:
1. Log into Allure TestOps
2. Go to Profile → API tokens
3. Generate a new token

## Usage

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Docker

Build the image:
```bash
npm run build
docker build -t allure-testops-mcp .
```

Run the container:
```bash
docker run -e ALLURE_TESTOPS_URL=https://your-instance.com \
           -e ALLURE_TOKEN=your-token \
           -e PROJECT_ID=1 \
           allure-testops-mcp
```

## Available Tools

### Test Cases

- `list_test_cases` - List all test cases in the project
- `get_test_case` - Get a specific test case by ID
- `create_test_case` - Create a new test case
- `update_test_case` - Update an existing test case
- `delete_test_case` - Delete a test case
- `bulk_create_test_cases_from_csv` - Bulk import test cases from CSV

#### CSV Format for Bulk Import

```csv
name,description,status,automated
Test Case 1,Description for test case 1,draft,true
Test Case 2,Description for test case 2,ready,false
```

### Launches

- `list_launches` - List all launches in the project
- `get_launch` - Get a specific launch by ID
- `create_launch` - Create a new launch
- `update_launch` - Update an existing launch
- `delete_launch` - Delete a launch
- `close_launch` - Close a launch

### Test Plans

- `list_test_plans` - List all test plans in the project
- `get_test_plan` - Get a specific test plan by ID
- `create_test_plan` - Create a new test plan
- `update_test_plan` - Update an existing test plan
- `delete_test_plan` - Delete a test plan

## MCP Client Configuration

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "node",
      "args": ["/path/to/allure-testops-mcp/dist/index.js"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://allure-testops.labs.jb.gg",
        "ALLURE_TOKEN": "your-token-here",
        "PROJECT_ID": "1"
      }
    }
  }
}
```

## License

MIT
# allure-testops-mcp
