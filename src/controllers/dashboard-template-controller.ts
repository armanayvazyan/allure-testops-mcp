/**
 * DashboardTemplateController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const dashboardTemplateControllerTools = [
    {
      "name": "allure_findAll_54",
      "description": "GET /api/dashboard-template",
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
      "name": "allure_findOne_44",
      "description": "GET /api/dashboard-template/{id}",
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

export async function handleDashboardTemplateControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_54': {
        const { page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/dashboard-template`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findOne_44': {
        const { id } = args;
        const result = await client.get(`/api/dashboard-template/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`DashboardTemplateController operation failed: ${error.message}`);
  }
}
