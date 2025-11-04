# Allure TestOps MCP Server

Model Context Protocol (MCP) server for Allure TestOps REST API. Provides comprehensive tooling for test case management, custom fields, and advanced search capabilities.

## Features

- **Test Case Management**: Full CRUD operations for test cases
- **Custom Fields**: Create and manage custom fields with options
- **Advanced Search**: Complex filtering and saved filters
- **Extensible Architecture**: Easy to add new controllers
- **TypeScript Support**: Fully typed implementation
- **Docker Support**: Can be run as a containerized service

## Prerequisites

- Node.js 20+
- Allure TestOps instance with API access
- API token for authentication

## Installation

```bash
npm install
```

## Environment Variables

Set the following environment variables:

```bash
export ALLURE_TESTOPS_URL="https://your-allure-instance.com"
export ALLURE_TOKEN="your-api-token"
export PROJECT_ID="your-project-id"
```

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

## Available Tools (25 total)

### Test Case Tools (5)
- `allure_list_test_cases` - List test cases with pagination and filtering
- `allure_get_test_case` - Get specific test case by ID
- `allure_create_test_case` - Create new test cases
- `allure_update_test_case` - Update existing test cases
- `allure_delete_test_case` - Delete test cases

### Custom Field Tools (9)
- `allure_list_custom_fields` - List custom fields with filtering
- `allure_get_custom_field` - Get specific custom field
- `allure_create_custom_field` - Create new custom fields
- `allure_update_custom_field` - Update custom fields
- `allure_delete_custom_field` - Delete custom fields
- `allure_archive_custom_field` - Archive/restore fields
- `allure_suggest_custom_field_values` - Get value suggestions
- `allure_count_custom_field_usage` - Count field usage
- `allure_merge_custom_fields` - Merge multiple fields

### Test Case Custom Field Tools (3)
- `allure_get_test_case_custom_fields` - Get all custom field values for a test case
- `allure_add_custom_fields_to_test_case` - Add custom fields to a test case
- `allure_update_test_case_custom_field` - Update custom field value on a test case

### Search & Filter Tools (8)
- `allure_search_test_cases` - Advanced search with complex filtering
- `allure_list_filters` - List saved filters
- `allure_get_filter` - Get specific filter
- `allure_create_filter` - Create saved filters
- `allure_update_filter` - Update filters
- `allure_delete_filter` - Delete filters
- `allure_get_base_filter` - Get default filter
- `allure_set_base_filter` - Set default filter

## MCP Client Configuration

### Using Node.js (Local Development)

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "node",
      "args": ["/path/to/allure-testops-mcp/dist/index.js"],
      "env": {
        "ALLURE_TESTOPS_URL": "https://your-allure-instance.com",
        "ALLURE_TOKEN": "your-api-token",
        "PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

### Using Docker

```json
{
  "mcpServers": {
    "allure-testops": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e", "ALLURE_TESTOPS_URL=https://your-allure-instance.com",
        "-e", "ALLURE_TOKEN=your-api-token",
        "-e", "PROJECT_ID=your-project-id",
        "allure-testops-mcp"
      ]
    }
  }
}
```

## Project Structure

```
src/
├── index.ts                                    # MCP server with extensible routing
├── allure-client.ts                           # HTTP client for Allure API
└── controllers/
    ├── test-case-controller.ts               # Test case CRUD operations
    ├── custom-field-controller.ts            # Custom field management
    ├── test-case-custom-field-controller.ts  # Custom field values on test cases
    └── test-case-search-controller.ts        # Advanced search and filters
```

## Extending the Server

The server uses an extensible registry pattern that makes adding new controllers simple.

### Adding a New Controller

1. **Create Controller File** (`src/controllers/your-controller.ts`):

```typescript
import { AllureClient, PageParams, PageResponse } from '../allure-client.js';

// Define your DTOs
export interface YourDto {
  id: number;
  name: string;
  // ... other fields
}

// Export tool definitions
export const yourTools = [
  {
    name: 'allure_your_operation',
    description: 'Description of what this tool does',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The resource ID',
        },
        // ... other parameters
      },
      required: ['id'],
    },
  },
  // ... more tools
];

// Export tool handler
export async function handleYourTool(
  client: AllureClient,
  toolName: string,
  args: any
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_your_operation': {
        const { id } = args;
        const result = await client.get<YourDto>(`/api/your-endpoint/${id}`);
        return JSON.stringify(result, null, 2);
      }

      // ... more cases

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`Your operation failed: ${error.message}`);
  }
}
```

2. **Register in `src/index.ts`**:

```typescript
// Import your controller
import { yourTools, handleYourTool } from './controllers/your-controller.js';

// Add to toolControllers array
const toolControllers: ToolRegistry[] = [
  {
    tools: testCaseTools,
    handler: handleTestCaseTool,
  },
  {
    tools: customFieldTools,
    handler: handleCustomFieldTool,
  },
  {
    tools: testCaseSearchTools,
    handler: handleTestCaseSearchTool,
  },
  // Add your controller here
  {
    tools: yourTools,
    handler: handleYourTool,
  },
];
```

3. **Rebuild**:

```bash
npm run build
```

That's it! The routing system automatically registers your tools and routes calls to your handler.

### Why This Architecture?

- **No Manual Routing**: Tools are automatically mapped to handlers
- **Type Safety**: Full TypeScript support with proper types
- **Easy Extension**: Just add to the array, no complex if/else chains
- **Maintainable**: Each controller is self-contained
- **Scalable**: Add dozens of controllers without code complexity

## API Client Usage

The `AllureClient` class provides typed HTTP methods:

```typescript
// GET request
const result = await client.get<YourDto>('/api/endpoint', { param: 'value' });

// POST request
const created = await client.post<YourDto>('/api/endpoint', bodyData);

// PATCH request
const updated = await client.patch<YourDto>('/api/endpoint/123', patchData);

// DELETE request
await client.delete('/api/endpoint/123');
```

## License

MIT
