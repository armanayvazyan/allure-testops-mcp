/**
 * ProjectPropertyController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectPropertyControllerTools = [
    {
      "name": "allure_findAll_21",
      "description": "Find all project properties",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "projectId"
        ]
      }
    },
    {
      "name": "allure_create_25",
      "description": "Create a new project property",
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
      "name": "allure_delete_22",
      "description": "Delete project by id",
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
      "name": "allure_findOne_18",
      "description": "Find project property by id",
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
      "name": "allure_patch_22",
      "description": "Patch project property",
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

export async function handleProjectPropertyControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_21': {
        const { projectId } = args;
        const queryParams = { projectId };
        const result = await client.get(`/api/projectproperty`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_25': {
        const { body } = args;
        const result = await client.post(`/api/projectproperty`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_22': {
        const { id } = args;
        await client.delete(`/api/projectproperty/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_18': {
        const { id } = args;
        const result = await client.get(`/api/projectproperty/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_22': {
        const { id, body } = args;
        const result = await client.patch(`/api/projectproperty/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectPropertyController operation failed: ${error.message}`);
  }
}
