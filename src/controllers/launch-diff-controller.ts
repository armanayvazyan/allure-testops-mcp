/**
 * LaunchDiffController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const launchDiffControllerTools = [
    {
      "name": "allure_passedToFailedDiff",
      "description": "Find failed",
      "inputSchema": {
        "type": "object",
        "properties": {
          "from": {
            "type": "number",
            "description": "from"
          },
          "to": {
            "type": "number",
            "description": "to"
          },
          "search": {
            "type": "string",
            "description": "search"
          }
        },
        "required": [
          "from",
          "to"
        ]
      }
    },
    {
      "name": "allure_failedToPassedDiff",
      "description": "Find fixed",
      "inputSchema": {
        "type": "object",
        "properties": {
          "from": {
            "type": "number",
            "description": "from"
          },
          "to": {
            "type": "number",
            "description": "to"
          },
          "search": {
            "type": "string",
            "description": "search"
          }
        },
        "required": [
          "from",
          "to"
        ]
      }
    },
    {
      "name": "allure_getStatusMatrix",
      "description": "Get status matrix for given launches with overlay parameter",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchIds": {
            "type": "array",
            "description": "launchIds",
            "items": {
              "type": "string"
            }
          },
          "mode": {
            "type": "string",
            "description": "mode"
          },
          "statusChange": {
            "type": "boolean",
            "description": "statusChange"
          },
          "search": {
            "type": "string",
            "description": "search"
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
          "launchIds"
        ]
      }
    },
    {
      "name": "allure_missed",
      "description": "Missed tests",
      "inputSchema": {
        "type": "object",
        "properties": {
          "from": {
            "type": "number",
            "description": "from"
          },
          "to": {
            "type": "number",
            "description": "to"
          },
          "search": {
            "type": "string",
            "description": "search"
          }
        },
        "required": [
          "from",
          "to"
        ]
      }
    },
    {
      "name": "allure_getNew",
      "description": "New tests",
      "inputSchema": {
        "type": "object",
        "properties": {
          "from": {
            "type": "number",
            "description": "from"
          },
          "to": {
            "type": "number",
            "description": "to"
          },
          "search": {
            "type": "string",
            "description": "search"
          }
        },
        "required": [
          "from",
          "to"
        ]
      }
    },
    {
      "name": "allure_statusChanged",
      "description": "Find status changed difference",
      "inputSchema": {
        "type": "object",
        "properties": {
          "from": {
            "type": "number",
            "description": "from"
          },
          "to": {
            "type": "number",
            "description": "to"
          },
          "search": {
            "type": "string",
            "description": "search"
          }
        },
        "required": [
          "from",
          "to"
        ]
      }
    }
  ];

export async function handleLaunchDiffControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_passedToFailedDiff': {
        const { from, to, search } = args;
        const queryParams = { from, to, search };
        const result = await client.get(`/api/launch/diff/failed`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_failedToPassedDiff': {
        const { from, to, search } = args;
        const queryParams = { from, to, search };
        const result = await client.get(`/api/launch/diff/fixed`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getStatusMatrix': {
        const { launchIds, mode, statusChange, search, page, size, sort } = args;
        const queryParams = { launchIds, mode, statusChange, search, page, size, sort };
        const result = await client.get(`/api/launch/diff/matrix`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_missed': {
        const { from, to, search } = args;
        const queryParams = { from, to, search };
        const result = await client.get(`/api/launch/diff/missed`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getNew': {
        const { from, to, search } = args;
        const queryParams = { from, to, search };
        const result = await client.get(`/api/launch/diff/new`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_statusChanged': {
        const { from, to, search } = args;
        const queryParams = { from, to, search };
        const result = await client.get(`/api/launch/diff/status-changed`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`LaunchDiffController operation failed: ${error.message}`);
  }
}
