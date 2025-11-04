/**
 * CleanupController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const cleanupControllerTools = [
    {
      "name": "allure_cleanupLaunch",
      "description": "POST /api/cleanup/launch",
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
      "name": "allure_triggerBlobRemoveTask",
      "description": "POST /api/cleanup/scheduler/blob_remove_task",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_triggerGlobalCleanup",
      "description": "POST /api/cleanup/scheduler/cleaner_schema_global",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_triggerCleanup",
      "description": "POST /api/cleanup/scheduler/cleaner_schema_project",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    }
  ];

export async function handleCleanupControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_cleanupLaunch': {
        const { body } = args;
        const result = await client.post(`/api/cleanup/launch`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_triggerBlobRemoveTask': {
        const result = await client.post(`/api/cleanup/scheduler/blob_remove_task`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_triggerGlobalCleanup': {
        const result = await client.post(`/api/cleanup/scheduler/cleaner_schema_global`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_triggerCleanup': {
        const result = await client.post(`/api/cleanup/scheduler/cleaner_schema_project`, {});
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`CleanupController operation failed: ${error.message}`);
  }
}
