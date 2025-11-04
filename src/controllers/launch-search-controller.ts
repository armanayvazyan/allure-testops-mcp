/**
 * LaunchSearchController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const launchSearchControllerTools = [
    {
      "name": "allure_search_2",
      "description": "Find all launches by given AQL",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "rql": {
            "type": "string",
            "description": "rql"
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
          "projectId",
          "rql"
        ]
      }
    },
    {
      "name": "allure_validateQuery_2",
      "description": "Find all launches by given AQL",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "rql": {
            "type": "string",
            "description": "rql"
          }
        },
        "required": [
          "projectId",
          "rql"
        ]
      }
    }
  ];

export async function handleLaunchSearchControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_search_2': {
        const { projectId, rql, page, size, sort } = args;
        const queryParams = { projectId, rql, page, size, sort };
        const result = await client.get(`/api/launch/__search`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_validateQuery_2': {
        const { projectId, rql } = args;
        const queryParams = { projectId, rql };
        const result = await client.get(`/api/launch/query/validate`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`LaunchSearchController operation failed: ${error.message}`);
  }
}
