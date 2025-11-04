/**
 * TreeController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const treeControllerTools = [
    {
      "name": "allure_findAll_3",
      "description": "GET /api/tree",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "withArchived": {
            "type": "boolean",
            "description": "withArchived"
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
      "name": "allure_create_4",
      "description": "POST /api/tree",
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
      "name": "allure_suggest_3",
      "description": "GET /api/tree/suggest",
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
      "name": "allure_delete_5",
      "description": "DELETE /api/tree/{id}",
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
      "name": "allure_findOne_4",
      "description": "GET /api/tree/{id}",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "withArchived": {
            "type": "boolean",
            "description": "withArchived"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_patch_4",
      "description": "PATCH /api/tree/{id}",
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

export async function handleTreeControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_3': {
        const { projectId, withArchived, page, size, sort } = args;
        const queryParams = { projectId, withArchived, page, size, sort };
        const result = await client.get(`/api/tree`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_4': {
        const { body } = args;
        const result = await client.post(`/api/tree`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_3': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/tree/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_5': {
        const { id } = args;
        await client.delete(`/api/tree/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_4': {
        const { id, withArchived } = args;
        const queryParams = { withArchived };
        const result = await client.get(`/api/tree/${args.id}`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_4': {
        const { id, body } = args;
        const result = await client.patch(`/api/tree/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TreeController operation failed: ${error.message}`);
  }
}
