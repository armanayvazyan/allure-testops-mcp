/**
 * LaunchIssueController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const launchIssueControllerTools = [
    {
      "name": "allure_getIssues_2",
      "description": "Get all issues used in launches",
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
      "name": "allure_export",
      "description": "Export launch data to issue issueTracker",
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

export async function handleLaunchIssueControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getIssues_2': {
        const { projectId } = args;
        const queryParams = { projectId };
        const result = await client.get(`/api/launch/issue`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_export': {
        const { launchId, body } = args;
        const result = await client.post(`/api/launch/${args.launchId}/issue/export`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`LaunchIssueController operation failed: ${error.message}`);
  }
}
