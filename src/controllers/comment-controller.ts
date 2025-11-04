/**
 * CommentController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const commentControllerTools = [
    {
      "name": "allure_findAll_43",
      "description": "Find all comments",
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
      "name": "allure_create_49",
      "description": "Create a new comment",
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
      "name": "allure_delete_39",
      "description": "Delete comment by id",
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
      "name": "allure_findOne_33",
      "description": "Find comment by id",
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
      "name": "allure_patch_45",
      "description": "Dynamic update comment",
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

export async function handleCommentControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_43': {
        const { testCaseId, page, size, sort } = args;
        const queryParams = { testCaseId, page, size, sort };
        const result = await client.get(`/api/comment`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_49': {
        const { body } = args;
        const result = await client.post(`/api/comment`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_39': {
        const { id } = args;
        await client.delete(`/api/comment/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_33': {
        const { id } = args;
        const result = await client.get(`/api/comment/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_45': {
        const { id, body } = args;
        const result = await client.patch(`/api/comment/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CommentController operation failed: ${error.message}`);
  }
}
