/**
 * TestResultController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testResultControllerTools = [
    {
      "name": "allure_findAll_5",
      "description": "Finds all test results by given launch",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "number",
            "description": "launchId"
          },
          "page": {
            "type": "number",
            "description": "Zero-based page index (0..N)"
          },
          "size": {
            "type": "number",
            "description": "The size of the page to be returned"
          },
          "sort": {
            "type": "array",
            "description": "Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "launchId"
        ]
      }
    },
    {
      "name": "allure_create_6",
      "description": "Create a new test result",
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
      "name": "allure_defects",
      "description": "Find defects by launch id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "number",
            "description": "launchId"
          }
        },
        "required": [
          "launchId"
        ]
      }
    },
    {
      "name": "allure_timeline",
      "description": "Find timeline data",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "number",
            "description": "launchId"
          }
        },
        "required": [
          "launchId"
        ]
      }
    },
    {
      "name": "allure_deleteById",
      "description": "Delete test result by given id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_findOne_5",
      "description": "GET /api/testresult/{id}",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_patch_5",
      "description": "Patches a test result by given id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "id",
          "body"
        ]
      }
    },
    {
      "name": "allure_findExecution",
      "description": "Find all execution for given test result",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_findHistory",
      "description": "Find all history for given test result",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "search": {
            "type": "string",
            "description": "search"
          },
          "page": {
            "type": "number",
            "description": "Zero-based page index (0..N)"
          },
          "size": {
            "type": "number",
            "description": "The size of the page to be returned"
          },
          "sort": {
            "type": "array",
            "description": "Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_findRetries",
      "description": "Find all retries for given test result",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "page": {
            "type": "number",
            "description": "Zero-based page index (0..N)"
          },
          "size": {
            "type": "number",
            "description": "The size of the page to be returned"
          },
          "sort": {
            "type": "array",
            "description": "Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "id"
        ]
      }
    }
  ];

export async function handleTestResultControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_5': {
        const { launchId, page, size, sort } = args;
        const queryParams = { launchId, page, size, sort };
        const result = await client.get(`/api/testresult`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_6': {
        const { body } = args;
        const result = await client.post(`/api/testresult`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_defects': {
        const { launchId } = args;
        const queryParams = { launchId };
        const result = await client.get(`/api/testresult/defects`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_timeline': {
        const { launchId } = args;
        const queryParams = { launchId };
        const result = await client.get(`/api/testresult/timeline`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteById': {
        const { id } = args;
        await client.delete(`/api/testresult/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_5': {
        const { id } = args;
        const result = await client.get(`/api/testresult/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_5': {
        const { id, body } = args;
        const result = await client.patch(`/api/testresult/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findExecution': {
        const { id } = args;
        const result = await client.get(`/api/testresult/${args.id}/execution`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findHistory': {
        const { id, search, page, size, sort } = args;
        const queryParams = { search, page, size, sort };
        const result = await client.get(`/api/testresult/${args.id}/history`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findRetries': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/testresult/${args.id}/retries`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestResultController operation failed: ${error.message}`);
  }
}
