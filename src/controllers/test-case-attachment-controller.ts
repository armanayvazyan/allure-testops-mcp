/**
 * TestCaseAttachmentController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseAttachmentControllerTools = [
    {
      "name": "allure_findAll_14",
      "description": "Find attachments for test case",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testCaseId": {
            "type": "number",
            "description": "testCaseId"
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
          "testCaseId"
        ]
      }
    },
    {
      "name": "allure_create_17",
      "description": "Upload new test case attachments",
      "inputSchema": {
        "type": "object",
        "properties": {
          "testCaseId": {
            "type": "number",
            "description": "testCaseId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "testCaseId",
          "body"
        ]
      }
    },
    {
      "name": "allure_delete_15",
      "description": "Delete test case attachment",
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
      "name": "allure_patch_15",
      "description": "Patch test case attachment",
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
      "name": "allure_readContent_2",
      "description": "Get attachment content by id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "inline": {
            "type": "boolean",
            "description": "inline"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_updateContent_2",
      "description": "Update test case attachment content",
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

export async function handleTestCaseAttachmentControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_14': {
        const { testCaseId, page, size, sort } = args;
        const queryParams = { testCaseId, page, size, sort };
        const result = await client.get(`/api/testcase/attachment`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_17': {
        const { testCaseId, body } = args;
        const queryParams = { testCaseId };
        const result = await client.post(`/api/testcase/attachment`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_15': {
        const { id } = args;
        await client.delete(`/api/testcase/attachment/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_patch_15': {
        const { id, body } = args;
        const result = await client.patch(`/api/testcase/attachment/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_readContent_2': {
        const { id, inline } = args;
        const queryParams = { inline };
        const result = await client.get(`/api/testcase/attachment/${args.id}/content`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_updateContent_2': {
        const { id, body } = args;
        const result = await client.put(`/api/testcase/attachment/${args.id}/content`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseAttachmentController operation failed: ${error.message}`);
  }
}
