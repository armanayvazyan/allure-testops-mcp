/**
 * TestCaseSearchController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseSearchControllerTools = [
    {
      "name": "allure_search_1",
      "description": "Find all test cases by given AQL",
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
          "deleted": {
            "type": "boolean",
            "description": "deleted"
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
      "name": "allure_validateQuery_1",
      "description": "Find all test cases by given AQL",
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
          "deleted": {
            "type": "boolean",
            "description": "deleted"
          }
        },
        "required": [
          "projectId",
          "rql"
        ]
      }
    }
  ];

export async function handleTestCaseSearchControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_search_1': {
        const { projectId, rql, deleted, page, size, sort } = args;
        const queryParams = { projectId, rql, deleted, page, size, sort };
        const result = await client.get(`/api/testcase/__search`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_validateQuery_1': {
        const { projectId, rql, deleted } = args;
        const queryParams = { projectId, rql, deleted };
        const result = await client.get(`/api/testcase/query/validate`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseSearchController operation failed: ${error.message}`);
  }
}
