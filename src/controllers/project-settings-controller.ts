/**
 * ProjectSettingsController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectSettingsControllerTools = [
    {
      "name": "allure_getLaunchCloseConfig",
      "description": "Get launch close config",
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
      "name": "allure_setLaunchCloseConfig",
      "description": "Save launch close config",
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
      "name": "allure_getLaunchLiveDocConfig",
      "description": "Get launch live documentation config",
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
      "name": "allure_setLaunchLiveDocConfig",
      "description": "Save launch live documentation config",
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

export async function handleProjectSettingsControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getLaunchCloseConfig': {
        const { projectId } = args;
        const queryParams = { projectId };
        const result = await client.get(`/api/projectsettings/launchclose`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setLaunchCloseConfig': {
        const { body } = args;
        const result = await client.patch(`/api/projectsettings/launchclose`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getLaunchLiveDocConfig': {
        const { projectId } = args;
        const queryParams = { projectId };
        const result = await client.get(`/api/projectsettings/launchlivedoc`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setLaunchLiveDocConfig': {
        const { body } = args;
        const result = await client.patch(`/api/projectsettings/launchlivedoc`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectSettingsController operation failed: ${error.message}`);
  }
}
