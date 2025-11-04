/**
 * ProjectController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectControllerTools = [
    {
      "name": "allure_findAll_22",
      "description": "Find all projects",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "query"
          },
          "my": {
            "type": "boolean",
            "description": "my"
          },
          "favorite": {
            "type": "boolean",
            "description": "favorite"
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
      "name": "allure_create_26",
      "description": "Create a new project",
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
      "name": "allure_countTestCasesInProjects",
      "description": "Count test cases in projects that use specified custom field",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "array",
            "description": "id",
            "items": {
              "type": "string"
            }
          },
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
          "deleted": {
            "type": "boolean",
            "description": "deleted"
          }
        },
        "required": [
          "id",
          "customFieldId"
        ]
      }
    },
    {
      "name": "allure_findByCustomField",
      "description": "Find projects that use/do not use specified custom field",
      "inputSchema": {
        "type": "object",
        "properties": {
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
          "exclude": {
            "type": "boolean",
            "description": "exclude"
          },
          "query": {
            "type": "string",
            "description": "query"
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
          "customFieldId"
        ]
      }
    },
    {
      "name": "allure_getSuggest",
      "description": "Suggest projects",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "query"
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
          "write": {
            "type": "boolean",
            "description": "write"
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
      "name": "allure_delete_23",
      "description": "Delete project by id",
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
      "name": "allure_findOne_19",
      "description": "Find project by id",
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
      "name": "allure_patch_25",
      "description": "Patch project",
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
      "name": "allure_setFavorite",
      "description": "Mark project as favorite",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "favorite": {
            "type": "boolean",
            "description": "favorite"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_calculateStats",
      "description": "Find project stats by id",
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

export async function handleProjectControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_22': {
        const { query, my, favorite, page, size, sort } = args;
        const queryParams = { query, my, favorite, page, size, sort };
        const result = await client.get(`/api/project`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_26': {
        const { body } = args;
        const result = await client.post(`/api/project`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_countTestCasesInProjects': {
        const { id, customFieldId, deleted } = args;
        const queryParams = { id, customFieldId, deleted };
        const result = await client.get(`/api/project/count-test-cases`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findByCustomField': {
        const { customFieldId, exclude, query, page, size, sort } = args;
        const queryParams = { customFieldId, exclude, query, page, size, sort };
        const result = await client.get(`/api/project/customfield`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getSuggest': {
        const { query, id, ignoreId, write, page, size, sort } = args;
        const queryParams = { query, id, ignoreId, write, page, size, sort };
        const result = await client.get(`/api/project/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_23': {
        const { id } = args;
        await client.delete(`/api/project/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_19': {
        const { id } = args;
        const result = await client.get(`/api/project/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_25': {
        const { id, body } = args;
        const result = await client.patch(`/api/project/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setFavorite': {
        const { id, favorite } = args;
        const queryParams = { favorite };
        const result = await client.post(`/api/project/${args.id}/favorite`, {}, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_calculateStats': {
        const { id } = args;
        const result = await client.get(`/api/project/${args.id}/stats`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectController operation failed: ${error.message}`);
  }
}
