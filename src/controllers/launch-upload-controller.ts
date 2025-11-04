/**
 * LaunchUploadController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const launchUploadControllerTools = [
    {
      "name": "allure_upload_1",
      "description": "Create launch from uploaded results",
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
      "name": "allure_upload",
      "description": "Manually upload launch results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "number",
            "description": "Path parameter: launchId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "launchId",
          "body"
        ]
      }
    },
    {
      "name": "allure_uploadArchives",
      "description": "Manually upload launch results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "number",
            "description": "Path parameter: launchId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "launchId",
          "body"
        ]
      }
    },
    {
      "name": "allure_uploadFiles",
      "description": "Manually upload launch results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "launchId": {
            "type": "number",
            "description": "Path parameter: launchId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "launchId",
          "body"
        ]
      }
    }
  ];

export async function handleLaunchUploadControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_upload_1': {
        const { body } = args;
        const result = await client.post(`/api/launch/upload`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_upload': {
        const { launchId, body } = args;
        const result = await client.post(`/api/launch/${args.launchId}/upload`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_uploadArchives': {
        const { launchId, body } = args;
        const result = await client.post(`/api/launch/${args.launchId}/upload/archive`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_uploadFiles': {
        const { launchId, body } = args;
        const result = await client.post(`/api/launch/${args.launchId}/upload/file`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`LaunchUploadController operation failed: ${error.message}`);
  }
}
