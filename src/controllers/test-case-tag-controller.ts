/**
 * TestCaseTagController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseTagControllerTools = [
    {
      "name": "allure_getTags",
      "description": "Find tags for test case",
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
    },
    {
      "name": "allure_setTags",
      "description": "Set test tags for test case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testCaseId": {
            "type": "number",
            "description": "Path parameter: testCaseId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "testCaseId",
          "body"
        ]
      }
    }
  ];

export async function handleTestCaseTagControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getTags': {
        const { testCaseId } = args;
        const result = await client.get(`/api/testcase/${args.testCaseId}/tag`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setTags': {
        const { testCaseId, body } = args;
        const result = await client.post(`/api/testcase/${args.testCaseId}/tag`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseTagController operation failed: ${error.message}`);
  }
}
