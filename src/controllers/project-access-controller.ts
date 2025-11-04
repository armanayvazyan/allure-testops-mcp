/**
 * ProjectAccessController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectAccessControllerTools = [
    {
      "name": "allure_deleteUsers",
      "description": "Delete collaborators from project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
          "projectId",
          "username"
        ]
      }
    },
    {
      "name": "allure_getProjectCollaborators",
      "description": "Get project collaborators",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_addProjectCollaborators",
      "description": "Add collaborators to project",
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
      "name": "allure_deleteProjectGroups",
      "description": "Delete groups from project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
          },
          "groupId": {
            "type": "array",
            "description": "groupId",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "projectId",
          "groupId"
        ]
      }
    },
    {
      "name": "allure_getProjectAccessGroups",
      "description": "Get project access groups",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_addProjectGroups",
      "description": "Add groups to project",
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

export async function handleProjectAccessControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_deleteUsers': {
        const { projectId, username } = args;
        const queryParams = { username };
        await client.delete(`/api/project/access/${args.projectId}/collaborator`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_getProjectCollaborators': {
        const { projectId, query, permissionsSetId, page, size, sort } = args;
        const queryParams = { query, permissionsSetId, page, size, sort };
        const result = await client.get(`/api/project/access/${args.projectId}/collaborator`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addProjectCollaborators': {
        const { projectId, body } = args;
        const result = await client.post(`/api/project/access/${args.projectId}/collaborator`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteProjectGroups': {
        const { projectId, groupId } = args;
        const queryParams = { groupId };
        await client.delete(`/api/project/access/${args.projectId}/group`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_getProjectAccessGroups': {
        const { projectId, query, permissionsSetId, page, size, sort } = args;
        const queryParams = { query, permissionsSetId, page, size, sort };
        const result = await client.get(`/api/project/access/${args.projectId}/group`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addProjectGroups': {
        const { projectId, body } = args;
        const result = await client.post(`/api/project/access/${args.projectId}/group`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectAccessController operation failed: ${error.message}`);
  }
}
