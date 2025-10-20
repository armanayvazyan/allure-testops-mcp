#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from './allure-client.js';
import { getAllTools, handleToolCall } from './tools/all-tools.js';

// Get configuration from environment variables
const ALLURE_TESTOPS_URL = process.env.ALLURE_TESTOPS_URL;
const ALLURE_TOKEN = process.env.ALLURE_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;

if (!ALLURE_TOKEN) {
  console.error('Error: ALLURE_TOKEN environment variable is required');
  process.exit(1);
}

if (!ALLURE_TESTOPS_URL) {
  console.error('Error: ALLURE_TESTOPS_URL environment variable is required');
  process.exit(1);
}

if (!PROJECT_ID) {
  console.error('Error: PROJECT_ID environment variable is required');
  process.exit(1);
}

const allureClient = new AllureClient({
  baseUrl: ALLURE_TESTOPS_URL,
  token: ALLURE_TOKEN,
  projectId: PROJECT_ID,
});

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

// Register tools - all tool definitions are now managed in the tools directory
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: getAllTools(),
  };
});

// Handle tool calls - all handlers are now managed in the tools directory
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;
    return await handleToolCall(name, args, allureClient);
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
