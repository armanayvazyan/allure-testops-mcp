/**
 * CustomFieldController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const customFieldControllerTools = [
    {
      "name": "allure_findByProject",
      "description": "Deprecated. Use GET /api/project/{projectId}/cf instead",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_create_53",
      "description": "POST /api/cf",
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
      "name": "allure_countUsage",
      "description": "Count custom fields usage in projects",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "array",
            "description": "id",
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
      "name": "allure_merge_4",
      "description": "POST /api/cf/merge",
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
      "name": "allure_suggest_23",
      "description": "GET /api/cf/suggest",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "query": {
            "type": "string",
            "description": "query"
          },
          "excludeProjectId": {
            "type": "array",
            "description": "excludeProjectId",
            "items": {
              "type": "string"
            }
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
      "name": "allure_delete_43",
      "description": "DELETE /api/cf/{id}",
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
      "name": "allure_findOne_37",
      "description": "GET /api/cf/{id}",
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
      "name": "allure_patch_49",
      "description": "PATCH /api/cf/{id}",
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
      "name": "allure_setArchived",
      "description": "Soft delete custom field",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "archived": {
            "type": "boolean",
            "description": "archived"
          }
        },
        "required": [
          "id"
        ]
      }
    }
  ];

export async function handleCustomFieldControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findByProject': {
        const { projectId, query, page, size, sort } = args;
        const queryParams = { projectId, query, page, size, sort };
        const result = await client.get(`/api/cf`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_53': {
        const { body } = args;
        const result = await client.post(`/api/cf`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_countUsage': {
        const { id } = args;
        const queryParams = { id };
        const result = await client.get(`/api/cf/count-usage`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_merge_4': {
        const { body } = args;
        const result = await client.post(`/api/cf/merge`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_23': {
        const { projectId, query, excludeProjectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { projectId, query, excludeProjectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/cf/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_43': {
        const { id } = args;
        await client.delete(`/api/cf/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_37': {
        const { id } = args;
        const result = await client.get(`/api/cf/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_49': {
        const { id, body } = args;
        const result = await client.patch(`/api/cf/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setArchived': {
        const { id, archived } = args;
        const queryParams = { archived };
        const result = await client.post(`/api/cf/${args.id}/archived`, {}, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CustomFieldController operation failed: ${error.message}`);
  }
}
