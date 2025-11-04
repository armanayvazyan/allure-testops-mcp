/**
 * BusinessMetricController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const businessMetricControllerTools = [
    {
      "name": "allure_findAll_55",
      "description": "Find all business metrics",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    }
  ];

export async function handleBusinessMetricControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_55': {
        const result = await client.get(`/api/business-metric`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`BusinessMetricController operation failed: ${error.message}`);
  }
}
