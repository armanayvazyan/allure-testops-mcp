/**
 * ProjectCategoryController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectCategoryControllerTools = [
    {
      "name": "allure_findAll_25",
      "description": "GET /api/project/{projectId}/category",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
      "name": "allure_add_1",
      "description": "POST /api/project/{projectId}/category",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
      "name": "allure_remove_1",
      "description": "POST /api/project/{projectId}/category/remove",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
    }
  ];

export async function handleProjectCategoryControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_25': {
        const { projectId, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/project/${args.projectId}/category`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_add_1': {
        const { projectId, body } = args;
        const result = await client.post(`/api/project/${args.projectId}/category`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_remove_1': {
        const { projectId, body } = args;
        const result = await client.post(`/api/project/${args.projectId}/category/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectCategoryController operation failed: ${error.message}`);
  }
}
