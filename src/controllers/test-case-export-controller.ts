/**
 * TestCaseExportController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseExportControllerTools = [
    {
      "name": "allure_exportToTms",
      "description": "POST /api/testcase/tms/sync",
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

export async function handleTestCaseExportControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_exportToTms': {
        const { body } = args;
        const result = await client.post(`/api/testcase/tms/sync`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseExportController operation failed: ${error.message}`);
  }
}
