/**
 * CustomFieldValueController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const customFieldValueControllerTools = [
    {
      "name": "allure_findAll_45",
      "description": "Find all custom field values",
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
          "global": {
            "type": "boolean",
            "description": "global"
          },
          "query": {
            "type": "string",
            "description": "query"
          },
          "strict": {
            "type": "boolean",
            "description": "strict"
          },
          "testCaseSearch": {
            "type": "string",
            "description": "testCaseSearch"
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
      "name": "allure_create_51",
      "description": "Deprecated. Use POST /api/project/{projectId}/cfv instead",
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
      "name": "allure_mergeProjectFieldsToNewGlobalValue",
      "description": "Merge project custom field values into new global",
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
      "name": "allure_mergeProjectFieldsToExistingGlobalValue",
      "description": "Merge project custom field values into existing global",
      "inputSchema": {
        "type": "object",
        "properties": {
          "toCfvId": {
            "type": "number",
            "description": "Path parameter: toCfvId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "toCfvId",
          "body"
        ]
      }
    },
    {
      "name": "allure_suggest_22",
      "description": "Suggest custom field values",
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
      "name": "allure_suggestV2",
      "description": "Suggest custom field values",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
          },
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
          },
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
        },
        "required": [
          "projectId"
        ]
      }
    },
    {
      "name": "allure_delete_41",
      "description": "Delete custom field value by id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_findOne_35",
      "description": "Find custom field value by id",
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
      "name": "allure_patch_47",
      "description": "Patch custom field value",
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
      "name": "allure_renameCustomFieldValue",
      "description": "Deprecated. Use PUT /api/project/{projectId}/cfv/{cvfId}/name instead",
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

export async function handleCustomFieldValueControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_45': {
        const { customFieldId, projectId, global, query, strict, testCaseSearch, page, size, sort } = args;
        const queryParams = { customFieldId, projectId, global, query, strict, testCaseSearch, page, size, sort };
        const result = await client.get(`/api/cfv`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_51': {
        const { body } = args;
        const result = await client.post(`/api/cfv`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_mergeProjectFieldsToNewGlobalValue': {
        const { body } = args;
        const result = await client.post(`/api/cfv/merge`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_mergeProjectFieldsToExistingGlobalValue': {
        const { toCfvId, body } = args;
        const result = await client.post(`/api/cfv/merge-to/${args.toCfvId}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_22': {
        const { customFieldId, query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { customFieldId, query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/cfv/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggestV2': {
        const { projectId, customFieldId, query, id, ignoreId, page, size, sort } = args;
        const queryParams = { customFieldId, query, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/cfv/suggest/${args.projectId}`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_41': {
        const { id, projectId } = args;
        const queryParams = { projectId };
        await client.delete(`/api/cfv/${args.id}`, queryParams);
        return 'Successfully deleted';
      }

      case 'allure_findOne_35': {
        const { id } = args;
        const result = await client.get(`/api/cfv/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_47': {
        const { id, body } = args;
        const result = await client.patch(`/api/cfv/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_renameCustomFieldValue': {
        const { id, body } = args;
        const result = await client.post(`/api/cfv/${args.id}/rename`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CustomFieldValueController operation failed: ${error.message}`);
  }
}
