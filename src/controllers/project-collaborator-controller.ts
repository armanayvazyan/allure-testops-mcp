/**
 * ProjectCollaboratorController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectCollaboratorControllerTools = [
    {
      "name": "allure_findAllCollaborators",
      "description": "Find all permission sets",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
      "name": "allure_findAllProjectOwners",
      "description": "Find project owners",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
    }
  ];

export async function handleProjectCollaboratorControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAllCollaborators': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/project/${args.id}/collaborator`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findAllProjectOwners': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/project/${args.id}/owner`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectCollaboratorController operation failed: ${error.message}`);
  }
}
