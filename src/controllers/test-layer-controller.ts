/**
 * TestLayerController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testLayerControllerTools = [
    {
      "name": "allure_findAll_8",
      "description": "GET /api/testlayer",
      "inputSchema": {
        "type": "object",
        "properties": {
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
      "name": "allure_create_10",
      "description": "POST /api/testlayer",
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
      "name": "allure_suggest_5",
      "description": "GET /api/testlayer/suggest",
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
      "name": "allure_delete_9",
      "description": "DELETE /api/testlayer/{id}",
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
      "name": "allure_findOne_8",
      "description": "GET /api/testlayer/{id}",
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
      "name": "allure_patch_9",
      "description": "PATCH /api/testlayer/{id}",
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

export async function handleTestLayerControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_8': {
        const { page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/testlayer`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_10': {
        const { body } = args;
        const result = await client.post(`/api/testlayer`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_5': {
        const { query, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/testlayer/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_9': {
        const { id } = args;
        await client.delete(`/api/testlayer/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_8': {
        const { id } = args;
        const result = await client.get(`/api/testlayer/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_9': {
        const { id, body } = args;
        const result = await client.patch(`/api/testlayer/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestLayerController operation failed: ${error.message}`);
  }
}
