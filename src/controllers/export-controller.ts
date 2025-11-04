/**
 * ExportController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const exportControllerTools = [
    {
      "name": "allure_generate_1",
      "description": "Generate launch pdf report",
      "inputSchema": {
        "type": "object",
        "properties": {
          "shared": {
            "type": "boolean",
            "description": "shared"
          },
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
      "name": "allure_getSupportedLaunchPdfContent",
      "description": "Get supported launch pdf report parts",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_generateTestCaseCsvExport_1",
      "description": "Generate test cases csv report",
      "inputSchema": {
        "type": "object",
        "properties": {
          "shared": {
            "type": "boolean",
            "description": "shared"
          },
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
      "name": "allure_getSupportedTCFields",
      "description": "Get supported test case export fields",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_generateTestCasePdfExport_1",
      "description": "Generate test cases pdf report",
      "inputSchema": {
        "type": "object",
        "properties": {
          "shared": {
            "type": "boolean",
            "description": "shared"
          },
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
      "name": "allure_generateTestResultCsvExport",
      "description": "Generate test results csv report",
      "inputSchema": {
        "type": "object",
        "properties": {
          "shared": {
            "type": "boolean",
            "description": "shared"
          },
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
      "name": "allure_getSupportedTRFields",
      "description": "Get supported test result export fields",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    }
  ];

export async function handleExportControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_generate_1': {
        const { shared, body } = args;
        const queryParams = { shared };
        const result = await client.post(`/api/export/launch/pdf`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getSupportedLaunchPdfContent': {
        const result = await client.get(`/api/export/launch/pdf/structure`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_generateTestCaseCsvExport_1': {
        const { shared, body } = args;
        const queryParams = { shared };
        const result = await client.post(`/api/export/testcase/csv`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getSupportedTCFields': {
        const result = await client.get(`/api/export/testcase/csv/mapping`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_generateTestCasePdfExport_1': {
        const { shared, body } = args;
        const queryParams = { shared };
        const result = await client.post(`/api/export/testcase/pdf`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_generateTestResultCsvExport': {
        const { shared, body } = args;
        const queryParams = { shared };
        const result = await client.post(`/api/export/testresult/csv`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getSupportedTRFields': {
        const result = await client.get(`/api/export/testresult/csv/mapping`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ExportController operation failed: ${error.message}`);
  }
}
