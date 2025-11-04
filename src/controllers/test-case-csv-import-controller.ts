/**
 * TestCaseCsvImportController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseCsvImportControllerTools = [
    {
      "name": "allure_info",
      "description": "Get testcase csv import file and return import info",
      "inputSchema": {
        "type": "object",
        "properties": {
          "importRequestId": {
            "type": "number",
            "description": "Path parameter: importRequestId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "importRequestId",
          "body"
        ]
      }
    },
    {
      "name": "allure_preview",
      "description": "Preview testcase csv import",
      "inputSchema": {
        "type": "object",
        "properties": {
          "importRequestId": {
            "type": "number",
            "description": "Path parameter: importRequestId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "importRequestId",
          "body"
        ]
      }
    },
    {
      "name": "allure_submit",
      "description": "Submit testcase csv import",
      "inputSchema": {
        "type": "object",
        "properties": {
          "importRequestId": {
            "type": "number",
            "description": "Path parameter: importRequestId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "importRequestId",
          "body"
        ]
      }
    }
  ];

export async function handleTestCaseCsvImportControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_info': {
        const { importRequestId, body } = args;
        const result = await client.post(`/api/testcase/import/csv/${args.importRequestId}/info`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_preview': {
        const { importRequestId, body } = args;
        const result = await client.post(`/api/testcase/import/csv/${args.importRequestId}/preview`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_submit': {
        const { importRequestId, body } = args;
        const result = await client.post(`/api/testcase/import/csv/${args.importRequestId}/submit`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseCsvImportController operation failed: ${error.message}`);
  }
}
