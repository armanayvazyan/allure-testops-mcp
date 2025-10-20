# Allure TestOps MCP Server

MCP (Model Context Protocol) server for Allure TestOps REST API integration. Provides CRUD operations for test cases, launches, and test plans, including bulk CSV import and AQL-based search capabilities.

## Features

- **Test Cases CRUD**: Create, read, update, delete test cases
- **AQL Search**: Search test cases using Allure Query Language with powerful filtering
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
ALLURE_TESTOPS_URL=https://allure-testops.test.com
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
- `search_test_cases_by_aql` - Search test cases using Allure Query Language
- `bulk_create_test_cases_from_csv` - Bulk import test cases from CSV

#### CSV Format for Bulk Import

```csv
name,description,status,automated
Test Case 1,Description for test case 1,draft,true
Test Case 2,Description for test case 2,ready,false
```

#### AQL Search Examples

Search test cases using Allure Query Language (AQL) for powerful filtering:

**Basic queries:**
```
name = "My Test"                          # Exact match
name ~= "test"                            # Partial match
tag = "smoke"                             # Filter by tag
```

**Multiple conditions:**
```
name ~= "test" and createdBy = "John"     # Combined with AND
tag = "smoke" or tag = "regression"       # Combined with OR
```

**Comparisons:**
```
id >= 100                                 # Numeric comparison
status != "passed"                        # Not equal
automated = true                          # Boolean field
```

**Advanced queries:**
```
name in ["Test 1", "Test 2"]              # Multiple values
role["Owner"] = null                      # Check null values
not name ~= "test"                        # Negation
createdDate > 1672531200000               # Date filtering (milliseconds)
```

**Complex query:**
```
(tag = "smoke" or tag = "regression") and status = "passed"
```

**Supported operators:** `=`, `!=`, `~=`, `>`, `<`, `>=`, `<=`, `and`, `or`, `not`, `in`

**Common fields:** `id`, `name`, `tag`, `issue`, `status`, `automation`, `createdDate`, `createdBy`

For more details, see the [official AQL documentation](https://docs.qameta.io/allure-testops/advanced/aql/).

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

### Using Docker (Recommended)

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "allure-testops": {
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
        "PROJECT_ID=1",
        "armanayvazyan/allure-testops-mcp:latest"
      ]
    }
  }
}
```

### Using Node.js (Local Development)

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

## Controllers Coverage

The MCP server now provides comprehensive coverage of the Allure TestOps API through 47+ specialized controllers:

### Test Case Management
- ✅ **test-case-controller** - CRUD operations for test cases
- ✅ **test-case-search-controller** - Search test cases using AQL
- ✅ **test-case-bulk-controller** - Bulk operations on test cases
- ✅ **test-case-bulk-controller-v2** - Enhanced bulk operations (v2)
- ✅ **test-case-attachment-controller** - Manage test case attachments
- ✅ **test-case-tag-controller** - Manage test case tags
- ✅ **test-case-audit-controller** - Test case audit logs
- ✅ **test-case-sync-controller** - Synchronize test cases
- ✅ **test-case-custom-field-controller** - Custom fields for test cases
- ✅ **test-case-csv-import-controller** - Import test cases from CSV
- ✅ **test-case-scenario-controller** - Manage test scenarios
- ✅ **test-case-export-controller** - Export test cases (CSV/Excel/JSON)
- ✅ **test-case-clone-controller** - Clone test cases
- ✅ **test-case-overview-controller** - Test case overview and statistics
- ✅ **test-case-tree-controller** - Test case tree structure
- ✅ **test-case-tree-selection-controller** - Select test cases from tree

### Launch Management
- ✅ **launch-controller** - CRUD operations for launches
- ✅ **launch-search-controller** - Search launches
- ✅ **launch-diff-controller** - Compare launches
- ✅ **launch-issue-controller** - Link issues to launches
- ✅ **launch-tag-controller** - Manage launch tags
- ✅ **launch-upload-controller** - Upload launch results

### Test Plan Management
- ✅ **test-plan-controller** - CRUD operations for test plans

### Test Result Management
- ✅ **test-result-controller** - CRUD operations for test results
- ✅ **test-result-search-controller** - Search test results
- ✅ **test-result-bulk-controller** - Bulk operations on test results
- ✅ **test-result-custom-field-controller** - Custom fields for test results

### Project Management
- ✅ **project-controller** - CRUD operations for projects
- ✅ **project-access-controller** - Manage project access rules
- ✅ **project-metric-controller** - Project metrics and analytics
- ✅ **project-collaborator-controller** - Manage project collaborators
- ✅ **project-category-controller** - Project categories
- ✅ **project-property-controller** - Project properties
- ✅ **project-settings-controller** - Project settings

### Dashboard & Visualization
- ✅ **dashboard-controller** - CRUD operations for dashboards
- ✅ **dashboard-template-controller** - Dashboard templates
- ✅ **widget-controller** - Dashboard widgets

### Custom Fields
- ✅ **custom-field-controller** - CRUD operations for custom fields
- ✅ **custom-field-project-controller** - Assign custom fields to projects
- ✅ **custom-field-schema-controller** - Custom field schemas
- ✅ **custom-field-value-controller** - Manage custom field values
- ✅ **custom-field-value-bulk-controller** - Bulk operations on custom field values

### Utility Controllers
- ✅ **category-controller** - Manage categories
- ✅ **filter-controller** - Manage filters
- ✅ **member-controller** - Manage project members
- ✅ **test-layer-controller** - Manage test layers
- ✅ **tree-controller** - Tree structure operations
- ✅ **upload-controller** - File upload operations

## Architecture

The codebase follows a modular controller-based architecture:

```
src/
├── controllers/           # 47+ specialized controllers
│   ├── test-case-controller.ts
│   ├── launch-controller.ts
│   └── ...
├── allure-client.ts      # Main client with all controllers
├── index.ts              # MCP server implementation
└── csv-parser.ts         # CSV parsing utilities
```

Each controller is responsible for a specific domain and provides type-safe methods for interacting with the Allure TestOps API.

## License

MIT
# allure-testops-mcp
