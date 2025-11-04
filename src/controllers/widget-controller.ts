/**
 * WidgetController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const widgetControllerTools = [
    {
      "name": "allure_findAllByDashboard",
      "description": "GET /api/widget",
      "inputSchema": {
        "type": "object",
        "properties": {
          "dashboardId": {
            "type": "number",
            "description": "dashboardId"
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
          "dashboardId"
        ]
      }
    },
    {
      "name": "allure_create_2",
      "description": "POST /api/widget",
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
      "name": "allure_delete_4",
      "description": "DELETE /api/widget/{id}",
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
      "name": "allure_findOne_3",
      "description": "GET /api/widget/{id}",
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
      "name": "allure_patch_3",
      "description": "PATCH /api/widget/{id}",
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
      "name": "allure_getData",
      "description": "GET /api/widget/{id}/data",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "parameters": {
            "type": "string",
            "description": "parameters"
          }
        },
        "required": [
          "id",
          "parameters"
        ]
      }
    }
  ];

export async function handleWidgetControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAllByDashboard': {
        const { dashboardId, page, size, sort } = args;
        const queryParams = { dashboardId, page, size, sort };
        const result = await client.get(`/api/widget`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_2': {
        const { body } = args;
        const result = await client.post(`/api/widget`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_4': {
        const { id } = args;
        await client.delete(`/api/widget/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_3': {
        const { id } = args;
        const result = await client.get(`/api/widget/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_3': {
        const { id, body } = args;
        const result = await client.patch(`/api/widget/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getData': {
        const { id, parameters } = args;
        const queryParams = { parameters };
        const result = await client.get(`/api/widget/${args.id}/data`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`WidgetController operation failed: ${error.message}`);
  }
}
