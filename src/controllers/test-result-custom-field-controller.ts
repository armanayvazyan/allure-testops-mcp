/**
 * TestResultCustomFieldController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testResultCustomFieldControllerTools = [
    {
      "name": "allure_getCustomFieldsWithValues_1",
      "description": "Find custom fields with values for test result",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testResultId": {
            "type": "number",
            "description": "Path parameter: testResultId"
          }
        },
        "required": [
          "testResultId"
        ]
      }
    },
    {
      "name": "allure_setIssues_1",
      "description": "Set custom field values to test result",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testResultId": {
            "type": "number",
            "description": "Path parameter: testResultId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "testResultId",
          "body"
        ]
      }
    }
  ];

export async function handleTestResultCustomFieldControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getCustomFieldsWithValues_1': {
        const { testResultId } = args;
        const result = await client.get(`/api/testresult/${args.testResultId}/cfv`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setIssues_1': {
        const { testResultId, body } = args;
        const result = await client.post(`/api/testresult/${args.testResultId}/cfv`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestResultCustomFieldController operation failed: ${error.message}`);
  }
}
