/**
 * CustomFieldProjectController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const customFieldProjectControllerTools = [
    {
      "name": "allure_findOne_45",
      "description": "GET /api/cfproject",
      "inputSchema": {
        "type": "object",
        "properties": {
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "customFieldId",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_add_2",
      "description": "Add custom field to projects",
      "inputSchema": {
        "type": "object",
        "properties": {
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "customFieldId",
          "body"
        ]
      }
    },
    {
      "name": "allure_addToProject",
      "description": "Add custom fields to project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
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
      "name": "allure_setDefault",
      "description": "Deprecated. Use PATCH /api/project/{projectId}/cf/{cfId} instead",
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
      "name": "allure_cfDelta_1",
      "description": "Find missing custom fields",
      "inputSchema": {
        "type": "object",
        "properties": {
          "toProjectId": {
            "type": "number",
            "description": "toProjectId"
          },
          "testCaseId": {
            "type": "array",
            "description": "testCaseId",
            "items": {
              "type": "string"
            }
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "toProjectId",
          "body"
        ]
      }
    },
    {
      "name": "allure_findProjectsByCustomField",
      "description": "Find projects that use specified custom field",
      "inputSchema": {
        "type": "object",
        "properties": {
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
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
          "customFieldId"
        ]
      }
    },
    {
      "name": "allure_remove_4",
      "description": "Remove custom field from project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "customFieldId",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_setRequired",
      "description": "Deprecated. Use PATCH /api/project/{projectId}/cf/{cfId} instead",
      "inputSchema": {
        "type": "object",
        "properties": {
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "required": {
            "type": "boolean",
            "description": "required"
          }
        },
        "required": [
          "customFieldId",
          "projectId",
          "required"
        ]
      }
    }
  ];

export async function handleCustomFieldProjectControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findOne_45': {
        const { customFieldId, projectId } = args;
        const queryParams = { customFieldId, projectId };
        const result = await client.get(`/api/cfproject`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_add_2': {
        const { customFieldId, body } = args;
        const queryParams = { customFieldId };
        const result = await client.post(`/api/cfproject/add`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addToProject': {
        const { projectId, body } = args;
        const queryParams = { projectId };
        const result = await client.post(`/api/cfproject/add-to-project`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setDefault': {
        const { body } = args;
        const result = await client.post(`/api/cfproject/default`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_cfDelta_1': {
        const { toProjectId, testCaseId, body } = args;
        const queryParams = { toProjectId, testCaseId };
        const result = await client.post(`/api/cfproject/delta`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_findProjectsByCustomField': {
        const { customFieldId, query, page, size, sort } = args;
        const queryParams = { customFieldId, query, page, size, sort };
        const result = await client.get(`/api/cfproject/in-projects`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_remove_4': {
        const { customFieldId, projectId } = args;
        const queryParams = { customFieldId, projectId };
        await client.delete(`/api/cfproject/remove`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_setRequired': {
        const { customFieldId, projectId, required } = args;
        const queryParams = { customFieldId, projectId, required };
        const result = await client.post(`/api/cfproject/required`, {}, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CustomFieldProjectController operation failed: ${error.message}`);
  }
}
