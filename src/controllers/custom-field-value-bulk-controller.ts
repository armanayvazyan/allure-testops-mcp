/**
 * CustomFieldValueBulkController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const customFieldValueBulkControllerTools = [
    {
      "name": "allure_delete_50",
      "description": "Delete custom field values from project",
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
      "name": "allure_merge_3",
      "description": "Deprecated. Use POST /api/cfv/merge-by-name or /api/cfv/merge-by-id instead",
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
    }
  ];

export async function handleCustomFieldValueBulkControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_delete_50': {
        const { body } = args;
        await client.delete(`/api/cfvbulk/delete`);
        return 'Successfully deleted';
      }

      case 'allure_merge_3': {
        const { body } = args;
        const result = await client.post(`/api/cfvbulk/merge`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CustomFieldValueBulkController operation failed: ${error.message}`);
  }
}
