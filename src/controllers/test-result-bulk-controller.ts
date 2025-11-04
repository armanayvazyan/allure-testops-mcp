/**
 * TestResultBulkController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testResultBulkControllerTools = [
    {
      "name": "allure_assign_1",
      "description": "Assign all selected test results",
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
      "name": "allure_linkDefects",
      "description": "Link defects for all selected test results",
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
      "name": "allure_hide",
      "description": "Hide all selected test results",
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
      "name": "allure_mute_1",
      "description": "Mute all selected test results",
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
      "name": "allure_rerun",
      "description": "Rerun all selected test results",
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
      "name": "allure_resolve_2",
      "description": "Resolve all selected test results",
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
      "name": "allure_tagsAdd_1",
      "description": "Add tags for all selected test results",
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
      "name": "allure_tagsRemove_1",
      "description": "Remove tags for all selected test results",
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
      "name": "allure_unmute_1",
      "description": "Unmute all selected test results",
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

export async function handleTestResultBulkControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_assign_1': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/assign`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_linkDefects': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/defect/link`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_hide': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/hide`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_mute_1': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/mute`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_rerun': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/rerun`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_resolve_2': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/resolve`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_tagsAdd_1': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/tag/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_tagsRemove_1': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/tag/remove`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_unmute_1': {
        const { body } = args;
        const result = await client.post(`/api/testresult/bulk/unmute`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestResultBulkController operation failed: ${error.message}`);
  }
}
