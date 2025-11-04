/**
 * TestPlanController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testPlanControllerTools = [
    {
      "name": "allure_findAllByProject",
      "description": "Find all test plans for given project",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "name": {
            "type": "string",
            "description": "name"
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
          "projectId"
        ]
      }
    },
    {
      "name": "allure_create_8",
      "description": "Create a new test plan",
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
      "name": "allure_suggest_4",
      "description": "Suggest for test plans",
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
      "name": "allure_delete_7",
      "description": "Delete test plan by given id",
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
      "name": "allure_findOne_6",
      "description": "Find test plan by id",
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
      "name": "allure_patch_7",
      "description": "Patch test plan",
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
      "name": "allure_assign_2",
      "description": "Assign test plan test cases to user",
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
      "name": "allure_getDiff",
      "description": "Get test plan test cases changes",
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
      "name": "allure_getJobs",
      "description": "Get test plan jobs statistic",
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
      "name": "allure_setJobParameters",
      "description": "Configure test plan job parameters",
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
      "name": "allure_getMembers_2",
      "description": "Get test plan members statistic",
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
      "name": "allure_resetJobs",
      "description": "Reset test plan",
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
      "name": "allure_run_3",
      "description": "Run test plan by given id",
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
      "name": "allure_sync",
      "description": "Sync test plan",
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
      "name": "allure_getGroups_2",
      "description": "Find tree groups for node",
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
          "path": {
            "type": "array",
            "description": "path",
            "items": {
              "type": "string"
            }
          },
          "username": {
            "type": "string",
            "description": "username"
          },
          "jobId": {
            "type": "number",
            "description": "jobId"
          },
          "manual": {
            "type": "boolean",
            "description": "manual"
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
      "name": "allure_getLeafs_1",
      "description": "Find tree leafs for node",
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
          "path": {
            "type": "array",
            "description": "path",
            "items": {
              "type": "string"
            }
          },
          "username": {
            "type": "string",
            "description": "username"
          },
          "jobId": {
            "type": "number",
            "description": "jobId"
          },
          "manual": {
            "type": "boolean",
            "description": "manual"
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
    }
  ];

export async function handleTestPlanControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAllByProject': {
        const { projectId, name, treeId, page, size, sort } = args;
        const queryParams = { projectId, name, treeId, page, size, sort };
        const result = await client.get(`/api/testplan`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_8': {
        const { body } = args;
        const result = await client.post(`/api/testplan`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_4': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/testplan/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_7': {
        const { id } = args;
        await client.delete(`/api/testplan/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOne_6': {
        const { id } = args;
        const result = await client.get(`/api/testplan/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_7': {
        const { id, body } = args;
        const result = await client.patch(`/api/testplan/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_assign_2': {
        const { id, body } = args;
        const result = await client.post(`/api/testplan/${args.id}/assign`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getDiff': {
        const { id } = args;
        const result = await client.get(`/api/testplan/${args.id}/diff`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getJobs': {
        const { id } = args;
        const result = await client.get(`/api/testplan/${args.id}/job`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_setJobParameters': {
        const { id, body } = args;
        const result = await client.post(`/api/testplan/${args.id}/jobparameter`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getMembers_2': {
        const { id } = args;
        const result = await client.get(`/api/testplan/${args.id}/member`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_resetJobs': {
        const { id } = args;
        const result = await client.post(`/api/testplan/${args.id}/resetjob`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_run_3': {
        const { id, body } = args;
        const result = await client.post(`/api/testplan/${args.id}/run`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_sync': {
        const { id } = args;
        const result = await client.post(`/api/testplan/${args.id}/sync`, {});
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getGroups_2': {
        const { id, treeId, path, username, jobId, manual, page, size, sort } = args;
        const queryParams = { treeId, path, username, jobId, manual, page, size, sort };
        const result = await client.get(`/api/testplan/${args.id}/tree/group`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getLeafs_1': {
        const { id, treeId, path, username, jobId, manual, page, size, sort } = args;
        const queryParams = { treeId, path, username, jobId, manual, page, size, sort };
        const result = await client.get(`/api/testplan/${args.id}/tree/leaf`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestPlanController operation failed: ${error.message}`);
  }
}
