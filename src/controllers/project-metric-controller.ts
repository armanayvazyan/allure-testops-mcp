/**
 * ProjectMetricController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const projectMetricControllerTools = [
    {
      "name": "allure_findAll_51",
      "description": "Find specific project metric for the period",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "metric": {
            "type": "string",
            "description": "metric"
          },
          "from": {
            "type": "number",
            "description": "from"
          },
          "to": {
            "type": "number",
            "description": "to"
          }
        },
        "required": [
          "id",
          "metric"
        ]
      }
    }
  ];

export async function handleProjectMetricControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_51': {
        const { id, metric, from, to } = args;
        const queryParams = { metric, from, to };
        const result = await client.get(`/api/project/${args.id}/business-metric`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`ProjectMetricController operation failed: ${error.message}`);
  }
}
