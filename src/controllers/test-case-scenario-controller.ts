/**
 * TestCaseScenarioController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseScenarioControllerTools = [
    {
      "name": "allure_create_16",
      "description": "Create scenario step",
      "inputSchema": {
        "type": "object",
        "properties": {
          "beforeId": {
            "type": "number",
            "description": "beforeId"
          },
          "afterId": {
            "type": "number",
            "description": "afterId"
          },
          "withExpectedResult": {
            "type": "boolean",
            "description": "withExpectedResult"
          },
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
      "name": "allure_deleteById_1",
      "description": "Delete a specified scenario step",
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
      "name": "allure_patchById",
      "description": "Patch a specified scenario step",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "withExpectedResult": {
            "type": "boolean",
            "description": "withExpectedResult"
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
      "name": "allure_move_1",
      "description": "Copy scenario step",
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
      "name": "allure_move",
      "description": "Move scenario step",
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
      "name": "allure_migrateScenario",
      "description": "Migrate scenario for test case",
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
      "name": "allure_deleteScenario",
      "description": "Delete scenario for test case",
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
      "name": "allure_getScenario",
      "description": "Find scenario for test case",
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
      "name": "allure_setTestCaseScenario",
      "description": "Set new type scenario for test case",
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
      "name": "allure_getScenarioFromLastRun",
      "description": "Find scenario for test case from last run",
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
      "name": "allure_getNormalizedScenario",
      "description": "Get scenario for test case",
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
    }
  ];

export async function handleTestCaseScenarioControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_create_16': {
        const { beforeId, afterId, withExpectedResult, body } = args;
        const queryParams = { beforeId, afterId, withExpectedResult };
        const result = await client.post(`/api/testcase/step`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteById_1': {
        const { id } = args;
        await client.delete(`/api/testcase/step/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_patchById': {
        const { id, withExpectedResult, body } = args;
        const queryParams = { withExpectedResult };
        const result = await client.patch(`/api/testcase/step/${args.id}`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_move_1': {
        const { id, body } = args;
        const result = await client.post(`/api/testcase/step/${args.id}/copy`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_move': {
        const { id, body } = args;
        const result = await client.post(`/api/testcase/step/${args.id}/move`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_migrateScenario': {
        const { id } = args;
        const result = await client.post(`/api/testcase/${args.id}/migrate`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteScenario': {
        const { id } = args;
        await client.delete(`/api/testcase/${args.id}/scenario`);
        return 'Successfully deleted';
      }

      case 'allure_getScenario': {
        const { id } = args;
        const result = await client.get(`/api/testcase/${args.id}/scenario`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setTestCaseScenario': {
        const { id, body } = args;
        const result = await client.post(`/api/testcase/${args.id}/scenario`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getScenarioFromLastRun': {
        const { id } = args;
        const result = await client.get(`/api/testcase/${args.id}/scenariofromrun`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getNormalizedScenario': {
        const { id } = args;
        const result = await client.get(`/api/testcase/${args.id}/step`);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseScenarioController operation failed: ${error.message}`);
  }
}
