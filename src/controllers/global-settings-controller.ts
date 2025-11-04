/**
 * GlobalSettingsController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const globalSettingsControllerTools = [
    {
      "name": "allure_getGlobalSettings",
      "description": "Returns global settings",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_getGlobalPermissions",
      "description": "Returns all global permissions for user",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_getMfaGlobalSettings",
      "description": "Returns mfa settings",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "allure_patchMfaGlobalSettings",
      "description": "Patch MFA global settings",
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
      "name": "allure_patchProjectCreate",
      "description": "Patch global settings",
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

export async function handleGlobalSettingsControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getGlobalSettings': {
        const result = await client.get(`/api/globalsettings`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getGlobalPermissions': {
        const result = await client.get(`/api/globalsettings/globalpermissions`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getMfaGlobalSettings': {
        const result = await client.get(`/api/globalsettings/mfa`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patchMfaGlobalSettings': {
        const { body } = args;
        const result = await client.patch(`/api/globalsettings/mfa`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patchProjectCreate': {
        const { body } = args;
        const result = await client.patch(`/api/globalsettings/projectcreate`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`GlobalSettingsController operation failed: ${error.message}`);
  }
}
