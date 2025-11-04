/**
 * MemberController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const memberControllerTools = [
    {
      "name": "allure_findAll_29",
      "description": "Find all role users",
      "inputSchema": {
        "type": "object",
        "properties": {
          "roleId": {
            "type": "number",
            "description": "roleId"
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
          "roleId"
        ]
      }
    },
    {
      "name": "allure_create_31",
      "description": "Create a new role user",
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
      "name": "allure_suggest_12",
      "description": "Suggest members",
      "inputSchema": {
        "type": "object",
        "properties": {
          "roleId": {
            "type": "number",
            "description": "roleId"
          },
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
      "name": "allure_delete_26",
      "description": "Delete role user by id",
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
      "name": "allure_findOne_22",
      "description": "Find role user by id",
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
      "name": "allure_patch_28",
      "description": "Patch role user",
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

export async function handleMemberControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_29': {
        const { roleId, page, size, sort } = args;
        const queryParams = { roleId, page, size, sort };
        const result = await client.get(`/api/member`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_31': {
        const { body } = args;
        const result = await client.post(`/api/member`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_12': {
        const { roleId, query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { roleId, query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/member/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_26': {
        const { id } = args;
        await client.delete(`/api/member/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_22': {
        const { id } = args;
        const result = await client.get(`/api/member/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_28': {
        const { id, body } = args;
        const result = await client.patch(`/api/member/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`MemberController operation failed: ${error.message}`);
  }
}
