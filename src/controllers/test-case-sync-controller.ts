/**
 * TestCaseSyncController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseSyncControllerTools = [
    {
      "name": "allure_sync_1",
      "description": "Clone test case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "body"
        ]
      }
    }
  ];

export async function handleTestCaseSyncControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_sync_1': {
        const { body } = args;
        const result = await client.post(`/api/testcase/bulk/sync`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseSyncController operation failed: ${error.message}`);
  }
}
