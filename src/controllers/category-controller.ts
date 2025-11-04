/**
 * CategoryController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const categoryControllerTools = [
    {
      "name": "allure_findAllNotAddedToProject",
      "description": "GET /api/category",
      "inputSchema": {
        "type": "object",
        "properties": {
          "excludedProjectId": {
            "type": "number",
            "description": "excludedProjectId"
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
      "name": "allure_create_55",
      "description": "POST /api/category",
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
      "name": "allure_suggest_24",
      "description": "GET /api/category/suggest",
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
      "name": "allure_remove_3",
      "description": "DELETE /api/category/{id}",
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
      "name": "allure_patch_51",
      "description": "PATCH /api/category/{id}",
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

export async function handleCategoryControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAllNotAddedToProject': {
        const { excludedProjectId, page, size, sort } = args;
        const queryParams = { excludedProjectId, page, size, sort };
        const result = await client.get(`/api/category`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_55': {
        const { body } = args;
        const result = await client.post(`/api/category`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_24': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/category/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_remove_3': {
        const { id } = args;
        await client.delete(`/api/category/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_patch_51': {
        const { id, body } = args;
        const result = await client.patch(`/api/category/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CategoryController operation failed: ${error.message}`);
  }
}
