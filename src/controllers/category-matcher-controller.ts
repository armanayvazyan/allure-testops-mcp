/**
 * CategoryMatcherController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const categoryMatcherControllerTools = [
    {
      "name": "allure_findAll_47",
      "description": "GET /api/categorymatcher",
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
          },
          "excludedProjectId": {
            "type": "number",
            "description": "excludedProjectId"
          }
        },
        "required": [
          "excludedProjectId"
        ]
      }
    },
    {
      "name": "allure_create_54",
      "description": "POST /api/categorymatcher",
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
      "name": "allure_deleteById_6",
      "description": "DELETE /api/categorymatcher/{id}",
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
      "name": "allure_patch_50",
      "description": "PATCH /api/categorymatcher/{id}",
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

export async function handleCategoryMatcherControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_47': {
        const { page, size, sort, excludedProjectId } = args;
        const queryParams = { page, size, sort, excludedProjectId };
        const result = await client.get(`/api/categorymatcher`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_54': {
        const { body } = args;
        const result = await client.post(`/api/categorymatcher`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteById_6': {
        const { id } = args;
        await client.delete(`/api/categorymatcher/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_patch_50': {
        const { id, body } = args;
        const result = await client.patch(`/api/categorymatcher/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CategoryMatcherController operation failed: ${error.message}`);
  }
}
