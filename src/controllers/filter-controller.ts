/**
 * FilterController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const filterControllerTools = [
    {
      "name": "allure_findAll_38",
      "description": "Find all filters by given project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "type": {
            "type": "string",
            "description": "type"
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
      "name": "allure_create_41",
      "description": "Create a new filter",
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
      "name": "allure_getBase",
      "description": "Get default filter",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "projectId"
        ]
      }
    },
    {
      "name": "allure_setBase",
      "description": "Set filter as default",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "projectId",
          "body"
        ]
      }
    },
    {
      "name": "allure_suggest_17",
      "description": "Get suggest for filters",
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
      "name": "allure_delete_32",
      "description": "Delete filter by id",
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
      "name": "allure_findOne_28",
      "description": "Find filter by id",
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
      "name": "allure_patch_37",
      "description": "Patch filter",
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
    }
  ];

export async function handleFilterControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_38': {
        const { projectId, type, page, size, sort } = args;
        const queryParams = { projectId, type, page, size, sort };
        const result = await client.get(`/api/filter`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_41': {
        const { body } = args;
        const result = await client.post(`/api/filter`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getBase': {
        const { projectId } = args;
        const queryParams = { projectId };
        const result = await client.get(`/api/filter/base`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setBase': {
        const { projectId, body } = args;
        const queryParams = { projectId };
        const result = await client.post(`/api/filter/base`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_17': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/filter/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_32': {
        const { id } = args;
        await client.delete(`/api/filter/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_28': {
        const { id } = args;
        const result = await client.get(`/api/filter/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_37': {
        const { id, body } = args;
        const result = await client.patch(`/api/filter/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`FilterController operation failed: ${error.message}`);
  }
}
