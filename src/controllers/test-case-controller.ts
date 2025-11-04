/**
 * TestCaseController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseControllerTools = [
    {
      "name": "allure_findAll_12",
      "description": "Find all test cases for specified project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_create_14",
      "description": "Create a new test case",
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
      "name": "allure_findAllDeleted",
      "description": "Find all deleted test cases for given project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_findHistory_2",
      "description": "Find run history for test case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testCaseId": {
            "type": "number",
            "description": "testCaseId"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "launchId": {
            "type": "number",
            "description": "launchId"
          },
          "testResultId": {
            "type": "number",
            "description": "testResultId"
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
          "testCaseId"
        ]
      }
    },
    {
      "name": "allure_findAllMuted",
      "description": "Find all muted test cases for given project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_suggest_7",
      "description": "Find suggest for test case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "query"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "id": {
            "type": "array",
            "description": "id",
            "items": {
              "type": "string"
            }
          },
          "ignoreId": {
            "type": "array",
            "description": "ignoreId",
            "items": {
              "type": "string"
            }
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
        }
      }
    },
    {
      "name": "allure_delete_13",
      "description": "Delete test case by id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "force": {
            "type": "boolean",
            "description": "force"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_findOne_11",
      "description": "Find test case by id",
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
      "name": "allure_patch_13",
      "description": "PATCH /api/testcase/{id}",
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
      "name": "allure_detachAutomation",
      "description": "Detach automation from test case",
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
      "name": "allure_findHistory_1",
      "description": "Find run history for test case",
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
      "name": "allure_restore",
      "description": "Restore test case by id",
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
      "name": "allure_findWorkflow",
      "description": "Find workflow for test case",
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
    }
  ];

export async function handleTestCaseControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_12': {
        const { projectId, page, size, sort } = args;
        const queryParams = { projectId, page, size, sort };
        const result = await client.get(`/api/testcase`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_14': {
        const { body } = args;
        const result = await client.post(`/api/testcase`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findAllDeleted': {
        const { projectId, page, size, sort } = args;
        const queryParams = { projectId, page, size, sort };
        const result = await client.get(`/api/testcase/deleted`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findHistory_2': {
        const { testCaseId, projectId, launchId, testResultId, search, page, size, sort } = args;
        const queryParams = { testCaseId, projectId, launchId, testResultId, search, page, size, sort };
        const result = await client.get(`/api/testcase/history`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findAllMuted': {
        const { projectId, page, size, sort } = args;
        const queryParams = { projectId, page, size, sort };
        const result = await client.get(`/api/testcase/muted`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_7': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/testcase/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_13': {
        const { id, force } = args;
        const queryParams = { force };
        await client.delete(`/api/testcase/${args.id}`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_findOne_11': {
        const { id } = args;
        const result = await client.get(`/api/testcase/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_13': {
        const { id, body } = args;
        const result = await client.patch(`/api/testcase/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_detachAutomation': {
        const { id, body } = args;
        const result = await client.post(`/api/testcase/${args.id}/detachautomation`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findHistory_1': {
        const { id, search, page, size, sort } = args;
        const queryParams = { search, page, size, sort };
        const result = await client.get(`/api/testcase/${args.id}/history`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_restore': {
        const { id } = args;
        const result = await client.post(`/api/testcase/${args.id}/restore`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findWorkflow': {
        const { id } = args;
        const result = await client.get(`/api/testcase/${args.id}/workflow`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseController operation failed: ${error.message}`);
  }
}
