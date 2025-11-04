/**
 * TestCaseCustomFieldController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseCustomFieldControllerTools = [
    {
      "name": "allure_getCustomFieldsWithValues_2",
      "description": "Find custom fields with values for test cases",
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
    },
    {
      "name": "allure_getCustomFieldsWithValues_3",
      "description": "Find custom fields with values for test case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testCaseId": {
            "type": "number",
            "description": "Path parameter: testCaseId"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "testCaseId",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_updateCfvsOfTestCase",
      "description": "Update custom field values of test case",
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

export async function handleTestCaseCustomFieldControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getCustomFieldsWithValues_2': {
        const { body } = args;
        const result = await client.post(`/api/testcase/cfv`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getCustomFieldsWithValues_3': {
        const { testCaseId, projectId } = args;
        const queryParams = { projectId };
        const result = await client.get(`/api/testcase/${args.testCaseId}/cfv`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_updateCfvsOfTestCase': {
        const { testCaseId, body } = args;
        const result = await client.patch(`/api/testcase/${args.testCaseId}/cfv`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseCustomFieldController operation failed: ${error.message}`);
  }
}
