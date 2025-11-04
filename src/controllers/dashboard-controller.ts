/**
 * DashboardController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const dashboardControllerTools = [
    {
      "name": "allure_findAllByProject_1",
      "description": "GET /api/dashboard",
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
      "name": "allure_create_48",
      "description": "POST /api/dashboard",
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
      "name": "allure_delete",
      "description": "DELETE /api/dashboard/{id}",
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
      "name": "allure_findOne",
      "description": "GET /api/dashboard/{id}",
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
      "name": "allure_patch",
      "description": "PATCH /api/dashboard/{id}",
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
      "name": "allure_update",
      "description": "PUT /api/dashboard/{id}",
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
      "name": "allure_copy_1",
      "description": "POST /api/dashboard/{id}/copy",
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
      "name": "allure_dragAndDrop_2",
      "description": "POST /api/dashboard/{id}/drag-and-drop",
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

export async function handleDashboardControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAllByProject_1': {
        const { projectId, page, size, sort } = args;
        const queryParams = { projectId, page, size, sort };
        const result = await client.get(`/api/dashboard`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_48': {
        const { body } = args;
        const result = await client.post(`/api/dashboard`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete': {
        const { id } = args;
        await client.delete(`/api/dashboard/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne': {
        const { id } = args;
        const result = await client.get(`/api/dashboard/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch': {
        const { id, body } = args;
        const result = await client.patch(`/api/dashboard/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_update': {
        const { id, body } = args;
        const result = await client.put(`/api/dashboard/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_copy_1': {
        const { id, body } = args;
        const result = await client.post(`/api/dashboard/${args.id}/copy`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_dragAndDrop_2': {
        const { id, body } = args;
        const result = await client.post(`/api/dashboard/${args.id}/drag-and-drop`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`DashboardController operation failed: ${error.message}`);
  }
}
