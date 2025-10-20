import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from '../allure-client.js';

export const testCaseTools: Tool[] = [
  {
    name: 'list_test_cases',
    description: 'List all test cases in the project',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number', description: 'Page number (optional)' },
        size: { type: 'number', description: 'Page size (optional)' },
      },
    },
  },
  {
    name: 'get_test_case',
    description: 'Get a specific test case by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Test case ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_test_case',
    description: 'Create a new test case',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Test case name' },
        description: { type: 'string', description: 'Test case description' },
        status: { type: 'string', description: 'Test case status' },
        automated: { type: 'boolean', description: 'Is automated' },
      },
      required: ['name'],
    },
  },
  {
    name: 'update_test_case',
    description: 'Update an existing test case',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Test case ID' },
        name: { type: 'string', description: 'Test case name' },
        description: { type: 'string', description: 'Test case description' },
        status: { type: 'string', description: 'Test case status' },
        automated: { type: 'boolean', description: 'Is automated' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_test_case',
    description: 'Delete a test case',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Test case ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'bulk_create_test_cases_from_csv',
    description: 'Bulk create test cases from CSV content. CSV should have columns: name, description, status, automated',
    inputSchema: {
      type: 'object',
      properties: {
        csv_content: { type: 'string', description: 'CSV file content' },
      },
      required: ['csv_content'],
    },
  },
  {
    name: 'search_test_cases_by_aql',
    description: `Search test cases using Allure Query Language (AQL). AQL supports filtering by fields like name, tag, status, etc.

Examples:
- Find test cases by name: name = "My Test"
- Partial match: name ~= "test"
- Multiple conditions: name ~= "test" and createdBy = "John"
- Find by tag: tag = "smoke"
- Not equal: status != "passed"
- Numeric comparison: id >= 100
- Boolean field: automated = true
- Multiple values: name in ["Test 1", "Test 2"]
- Date range: createdDate > 1672531200000 and createdDate < 1704067200000
- Check null: role["Owner"] = null
- Negation: not name ~= "test"
- Complex query: (tag = "smoke" or tag = "regression") and status = "passed"

Supported operators: =, !=, ~=, >, <, >=, <=, and, or, not, in
Common fields: id, name, tag, issue, status, automation, createdDate, createdBy`,
    inputSchema: {
      type: 'object',
      properties: {
        aql: {
          type: 'string',
          description: 'AQL query string. See tool description for examples and syntax.'
        },
        page: { type: 'number', description: 'Page number (optional)' },
        size: { type: 'number', description: 'Page size (optional)' },
      },
      required: ['aql'],
    },
  },
];

export async function handleTestCaseTools(name: string, args: any, client: AllureClient): Promise<any> {
  switch (name) {
    case 'list_test_cases': {
      const result = await client.getTestCases(args || {});
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'get_test_case': {
      const { id } = args;
      const result = await client.getTestCase(id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'create_test_case': {
      const result = await client.createTestCase(args);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'update_test_case': {
      const { id, ...updateData } = args;
      const result = await client.updateTestCase(id, updateData);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'delete_test_case': {
      const { id } = args;
      await client.deleteTestCase(id);
      return {
        content: [{ type: 'text', text: 'Test case deleted successfully' }],
      };
    }

    case 'bulk_create_test_cases_from_csv': {
      const { csv_content } = args;
      const { parseTestCasesFromCSV } = await import('../csv-parser.js');
      const testCases = parseTestCasesFromCSV(csv_content);
      const result = await client.bulkCreateTestCases(testCases);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    case 'search_test_cases_by_aql': {
      const { aql, ...params } = args;
      const result = await client.searchTestCasesByAQL(aql, params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    default:
      return null;
  }
}
