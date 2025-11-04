/**
 * TestCaseOverviewController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseOverviewControllerTools = [
    {
      "name": "allure_getOverview",
      "description": "Get test case overview",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testCaseId": {
            "type": "number",
            "description": "Path parameter: testCaseId"
          }
        },
        "required": [
          "testCaseId"
        ]
      }
    }
  ];

export async function handleTestCaseOverviewControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getOverview': {
        const { testCaseId } = args;
        const result = await client.get(`/api/testcase/${args.testCaseId}/overview`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseOverviewController operation failed: ${error.message}`);
  }
}
