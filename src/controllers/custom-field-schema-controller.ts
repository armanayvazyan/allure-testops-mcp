/**
 * CustomFieldSchemaController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const customFieldSchemaControllerTools = [
    {
      "name": "allure_findAll_46",
      "description": "Find all custom field schemas for specified project and custom field",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "customFieldId": {
            "type": "number",
            "description": "customFieldId"
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
      "name": "allure_create_52",
      "description": "Create a new custom field schema",
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
      "name": "allure_countMappings",
      "description": "Count custom fields mappings",
      "inputSchema": {
        "type": "object",
        "properties": {
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
          }
        },
        "required": [
          "projectId",
          "id"
        ]
      }
    },
    {
      "name": "allure_delete_42",
      "description": "Delete custom field schema by id",
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
      "name": "allure_findOne_36",
      "description": "Find custom field schema by id",
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
      "name": "allure_patch_48",
      "description": "Patch custom field schema",
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

export async function handleCustomFieldSchemaControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_46': {
        const { projectId, customFieldId, page, size, sort } = args;
        const queryParams = { projectId, customFieldId, page, size, sort };
        const result = await client.get(`/api/cfschema`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_52': {
        const { body } = args;
        const result = await client.post(`/api/cfschema`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_countMappings': {
        const { projectId, id } = args;
        const queryParams = { projectId, id };
        const result = await client.get(`/api/cfschema/count-mappings`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_42': {
        const { id } = args;
        await client.delete(`/api/cfschema/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_36': {
        const { id } = args;
        const result = await client.get(`/api/cfschema/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_48': {
        const { id, body } = args;
        const result = await client.patch(`/api/cfschema/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CustomFieldSchemaController operation failed: ${error.message}`);
  }
}
