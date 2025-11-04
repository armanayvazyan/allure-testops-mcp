/**
 * LaunchController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const launchControllerTools = [
    {
      "name": "allure_findAll_30",
      "description": "Find all launches preview",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "search": {
            "type": "string",
            "description": "search"
          },
          "filterId": {
            "type": "number",
            "description": "filterId"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_create_32",
      "description": "Create a new launch",
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
      "name": "allure_merge",
      "description": "Merge launches",
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
      "name": "allure_create_34",
      "description": "Create a new launch via event",
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
      "name": "allure_suggest_14",
      "description": "Suggest for launches",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "query"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "id": {
            "type": "array",
            "description": "id",
            "items": {
              "type": "string"
            }
          },
          "ignoreId": {
            "type": "array",
            "description": "ignoreId",
            "items": {
              "type": "string"
            }
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
        }
      }
    },
    {
      "name": "allure_delete_27",
      "description": "Delete launch by id",
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
      "name": "allure_findOne_23",
      "description": "Find launch by id",
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
      "name": "allure_patch_29",
      "description": "Patch launch",
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
      "name": "allure_getAssignees",
      "description": "Get launch assignees",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "query": {
            "type": "string",
            "description": "query"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_close",
      "description": "Close launch",
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
      "name": "allure_copyLaunch",
      "description": "Copy launch",
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
      "name": "allure_getDefects_2",
      "description": "Get launch defects",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_applyDefectMatchers",
      "description": "Apply defect matchers to launch",
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
      "name": "allure_getDuration",
      "description": "Get launch duration",
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
      "name": "allure_getEnvironment",
      "description": "Get launch environment",
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
      "name": "allure_getJobs_1",
      "description": "Get launch jobs",
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
      "name": "allure_suggestJobs",
      "description": "Suggest launch jobs",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "array",
            "description": "id",
            "items": {
              "type": "string"
            }
          },
          "query": {
            "type": "string",
            "description": "query"
          },
          "ignoreId": {
            "type": "array",
            "description": "ignoreId",
            "items": {
              "type": "string"
            }
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
          "id"
        ]
      }
    },
    {
      "name": "allure_getMemberStats",
      "description": "Get member stats widget data",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_getMutedTestResults",
      "description": "Get muted test results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_getProgress",
      "description": "Get progress widget data",
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
      "name": "allure_reopen",
      "description": "Reopen launch",
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
      "name": "allure_getRetries",
      "description": "Get retries widget data",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_getStatistic",
      "description": "Get launch statistic",
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
      "name": "allure_addTestCases",
      "description": "Add test cases to launch",
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
      "name": "allure_getTesters",
      "description": "Get launch testers",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "query": {
            "type": "string",
            "description": "query"
          }
        },
        "required": [
          "id"
        ]
      }
    },
    {
      "name": "allure_addTestPlan",
      "description": "Add test plan to launch",
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
      "name": "allure_getUnresolvedTestResults",
      "description": "Get unresolved test results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_getVariables",
      "description": "Get variables widget data",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
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
          "id"
        ]
      }
    },
    {
      "name": "allure_getWidgetTree",
      "description": "Get suites for tree data",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "Path parameter: id"
          },
          "treeId": {
            "type": "number",
            "description": "treeId"
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
          "id",
          "treeId"
        ]
      }
    }
  ];

export async function handleLaunchControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAll_30': {
        const { projectId, search, filterId, page, size, sort } = args;
        const queryParams = { projectId, search, filterId, page, size, sort };
        const result = await client.get(`/api/launch`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_32': {
        const { body } = args;
        const result = await client.post(`/api/launch`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_merge': {
        const { body } = args;
        const result = await client.post(`/api/launch/merge`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_34': {
        const { body } = args;
        const result = await client.post(`/api/launch/new`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_14': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/launch/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_27': {
        const { id } = args;
        await client.delete(`/api/launch/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_23': {
        const { id } = args;
        const result = await client.get(`/api/launch/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_29': {
        const { id, body } = args;
        const result = await client.patch(`/api/launch/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getAssignees': {
        const { id, query } = args;
        const queryParams = { query };
        const result = await client.get(`/api/launch/${args.id}/assignees`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_close': {
        const { id } = args;
        const result = await client.post(`/api/launch/${args.id}/close`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_copyLaunch': {
        const { id, body } = args;
        const result = await client.post(`/api/launch/${args.id}/copy`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getDefects_2': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/defect`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_applyDefectMatchers': {
        const { id } = args;
        const result = await client.post(`/api/launch/${args.id}/defect/apply`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getDuration': {
        const { id } = args;
        const result = await client.get(`/api/launch/${args.id}/duration`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getEnvironment': {
        const { id } = args;
        const result = await client.get(`/api/launch/${args.id}/env`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getJobs_1': {
        const { id } = args;
        const result = await client.get(`/api/launch/${args.id}/job`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggestJobs': {
        const { id, query, ignoreId, page, size, sort } = args;
        const queryParams = { query, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/job/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getMemberStats': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/memberstats`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getMutedTestResults': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/muted`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getProgress': {
        const { id } = args;
        const result = await client.get(`/api/launch/${args.id}/progress`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_reopen': {
        const { id } = args;
        const result = await client.post(`/api/launch/${args.id}/reopen`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getRetries': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/retries`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getStatistic': {
        const { id } = args;
        const result = await client.get(`/api/launch/${args.id}/statistic`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addTestCases': {
        const { id, body } = args;
        const result = await client.post(`/api/launch/${args.id}/testcase/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getTesters': {
        const { id, query } = args;
        const queryParams = { query };
        const result = await client.get(`/api/launch/${args.id}/tester`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addTestPlan': {
        const { id, body } = args;
        const result = await client.post(`/api/launch/${args.id}/testplan/add`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getUnresolvedTestResults': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/unresolved`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getVariables': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/variables`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getWidgetTree': {
        const { id, treeId, page, size, sort } = args;
        const queryParams = { treeId, page, size, sort };
        const result = await client.get(`/api/launch/${args.id}/widget/tree`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`LaunchController operation failed: ${error.message}`);
  }
}
