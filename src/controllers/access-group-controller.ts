/**
 * AccessGroupController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const accessGroupControllerTools = [
    {
      "name": "allure_findAll_48",
      "description": "Find all groups",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "query"
          },
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
        }
      }
    },
    {
      "name": "allure_create_56",
      "description": "Create a new group",
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
      "name": "allure_suggest_26",
      "description": "Suggests groups",
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
      "name": "allure_deleteById_7",
      "description": "Delete group by id",
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
      "name": "allure_fetchById",
      "description": "Find group by id",
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
      "name": "allure_patchById_4",
      "description": "Patch group",
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
      "name": "allure_deleteProjects",
      "description": "Delete projects from group",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "projectId": {
            "type": "array",
            "description": "projectId",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "id",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_getProjects",
      "description": "Get group's projects",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "query": {
            "type": "string",
            "description": "query"
          },
          "permissionsSetId": {
            "type": "array",
            "description": "permissionsSetId",
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
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_addProjects",
      "description": "Add projects to group",
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
      "name": "allure_deleteUsers_1",
      "description": "Delete users from group",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "username": {
            "type": "array",
            "description": "username",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "id",
          "username"
        ]
      }
    },
    {
      "name": "allure_getUsers",
      "description": "Get group's users",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "query": {
            "type": "string",
            "description": "query"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_addUsers",
      "description": "Add users to group",
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

export async function handleAccessGroupControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_48': {
        const { query, projectId, page, size, sort } = args;
        const queryParams = { query, projectId, page, size, sort };
        const result = await client.get(`/api/accessgroup`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_56': {
        const { body } = args;
        const result = await client.post(`/api/accessgroup`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_26': {
        const { query, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/accessgroup/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteById_7': {
        const { id } = args;
        await client.delete(`/api/accessgroup/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_fetchById': {
        const { id } = args;
        const result = await client.get(`/api/accessgroup/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patchById_4': {
        const { id, body } = args;
        const result = await client.patch(`/api/accessgroup/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteProjects': {
        const { id, projectId } = args;
        const queryParams = { projectId };
        await client.delete(`/api/accessgroup/${args.id}/project`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_getProjects': {
        const { id, query, permissionsSetId, page, size, sort } = args;
        const queryParams = { query, permissionsSetId, page, size, sort };
        const result = await client.get(`/api/accessgroup/${args.id}/project`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addProjects': {
        const { id, body } = args;
        const result = await client.post(`/api/accessgroup/${args.id}/project`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteUsers_1': {
        const { id, username } = args;
        const queryParams = { username };
        await client.delete(`/api/accessgroup/${args.id}/user`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_getUsers': {
        const { id, query, page, size, sort } = args;
        const queryParams = { query, page, size, sort };
        const result = await client.get(`/api/accessgroup/${args.id}/user`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addUsers': {
        const { id, body } = args;
        const result = await client.post(`/api/accessgroup/${args.id}/user`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`AccessGroupController operation failed: ${error.message}`);
  }
}
