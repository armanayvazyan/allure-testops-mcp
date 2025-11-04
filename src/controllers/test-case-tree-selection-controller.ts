/**
 * TestCaseTreeSelectionController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseTreeSelectionControllerTools = [
    {
      "name": "allure_countLeaves_2",
      "description": "Count test cases by tree select",
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

export async function handleTestCaseTreeSelectionControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_countLeaves_2': {
        const { body } = args;
        const result = await client.post(`/api/testcasetree/select`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseTreeSelectionController operation failed: ${error.message}`);
  }
}
