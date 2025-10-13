#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from './allure-client.js';
import { parseTestCasesFromCSV } from './csv-parser.js';

// Get configuration from environment variables
const ALLURE_TESTOPS_URL = process.env.ALLURE_TESTOPS_URL || 'https://allure-testops.test.com';
const ALLURE_TOKEN = process.env.ALLURE_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;

if (!ALLURE_TOKEN) {
  console.error('Error: ALLURE_TOKEN environment variable is required');
  process.exit(1);
}

if (!PROJECT_ID) {
  console.error('Error: PROJECT_ID environment variable is required');
  process.exit(1);
}

// Initialize Allure client
const allureClient = new AllureClient({
  baseUrl: ALLURE_TESTOPS_URL,
  token: ALLURE_TOKEN,
  projectId: PROJECT_ID,
});

// Create MCP server
const server = new Server(
  {
    name: 'allure-testops-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
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
        name: 'list_launches',
        description: 'List all launches in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_launch',
        description: 'Get a specific launch by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_launch',
        description: 'Create a new launch',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Launch name' },
            closed: { type: 'boolean', description: 'Is closed' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_launch',
        description: 'Update an existing launch',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
            name: { type: 'string', description: 'Launch name' },
            closed: { type: 'boolean', description: 'Is closed' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_launch',
        description: 'Delete a launch',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'close_launch',
        description: 'Close a launch',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'list_test_plans',
        description: 'List all test plans in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_test_plan',
        description: 'Get a specific test plan by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test plan ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_test_plan',
        description: 'Create a new test plan',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Test plan name' },
            description: { type: 'string', description: 'Test plan description' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_test_plan',
        description: 'Update an existing test plan',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test plan ID' },
            name: { type: 'string', description: 'Test plan name' },
            description: { type: 'string', description: 'Test plan description' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_test_plan',
        description: 'Delete a test plan',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test plan ID' },
          },
          required: ['id'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'list_test_cases': {
        const result = await allureClient.getTestCases(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_case': {
        const result = await allureClient.getTestCase((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_case': {
        const result = await allureClient.createTestCase(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_case': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.updateTestCase(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_case': {
        await allureClient.deleteTestCase((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Test case ${(args as any)?.id} deleted successfully` }],
        };
      }

      case 'bulk_create_test_cases_from_csv': {
        const testCases = parseTestCasesFromCSV((args as any)?.csv_content);
        const results = await allureClient.bulkCreateTestCases(testCases);
        return {
          content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
        };
      }

      case 'list_launches': {
        const result = await allureClient.getLaunches(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_launch': {
        const result = await allureClient.getLaunch((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_launch': {
        const result = await allureClient.createLaunch(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_launch': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.updateLaunch(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_launch': {
        await allureClient.deleteLaunch((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Launch ${(args as any)?.id} deleted successfully` }],
        };
      }

      case 'close_launch': {
        const result = await allureClient.closeLaunch((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'list_test_plans': {
        const result = await allureClient.getTestPlans(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_plan': {
        const result = await allureClient.getTestPlan((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_plan': {
        const result = await allureClient.createTestPlan(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_plan': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.updateTestPlan(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_plan': {
        await allureClient.deleteTestPlan((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Test plan ${(args as any)?.id} deleted successfully` }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}\n${error.response?.data ? JSON.stringify(error.response.data, null, 2) : ''}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Allure TestOps MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
