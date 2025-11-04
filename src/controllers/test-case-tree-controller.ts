/**
 * TestCaseTreeController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const testCaseTreeControllerTools = [
    {
      "name": "allure_countLeaves_3",
      "description": "Count all tree leaves for given path and filter",
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
          "treeId": {
            "type": "number",
            "description": "treeId"
          },
          "filterId": {
            "type": "number",
            "description": "filterId"
          },
          "deleted": {
            "type": "boolean",
            "description": "deleted"
          },
          "path": {
            "type": "array",
            "description": "path",
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
      "name": "allure_getGroups",
      "description": "Find tree groups for node (AQL)",
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
          "treeId": {
            "type": "number",
            "description": "treeId"
          },
          "filterId": {
            "type": "number",
            "description": "filterId"
          },
          "path": {
            "type": "array",
            "description": "path",
            "items": {
              "type": "string"
            }
          },
          "withEmptyCategories": {
            "type": "boolean",
            "description": "withEmptyCategories"
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
          },
          "baseRql": {
            "type": "string",
            "description": "baseRql"
          }
        },
        "required": [
          "projectId"
        ]
      }
    },
    {
      "name": "allure_addGroup_1",
      "description": "Add a new group (AQL)",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "filterId": {
            "type": "number",
            "description": "filterId"
          },
          "search": {
            "type": "string",
            "description": "search"
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
          "baseRql": {
            "type": "string",
            "description": "baseRql"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "projectId",
          "body"
        ]
      }
    },
    {
      "name": "allure_renameGroup_1",
      "description": "Rename tree group (AQL)",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "filterId": {
            "type": "number",
            "description": "filterId"
          },
          "search": {
            "type": "string",
            "description": "search"
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
          "baseRql": {
            "type": "string",
            "description": "baseRql"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "projectId",
          "body"
        ]
      }
    },
    {
      "name": "allure_getJobsInfo",
      "description": "Get information about jobs that will be used to run selected test cases",
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
      "name": "allure_getLeaves",
      "description": "Find tree leaves for node (AQL)",
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
          "treeId": {
            "type": "number",
            "description": "treeId"
          },
          "filterId": {
            "type": "number",
            "description": "filterId"
          },
          "path": {
            "type": "array",
            "description": "path",
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
          },
          "baseRql": {
            "type": "string",
            "description": "baseRql"
          }
        },
        "required": [
          "projectId"
        ]
      }
    },
    {
      "name": "allure_addLeaf_1",
      "description": "Add a new group",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
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
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "projectId",
          "body"
        ]
      }
    },
    {
      "name": "allure_renameLeaf_1",
      "description": "Rename tree leaf",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "leafId": {
            "type": "number",
            "description": "leafId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "projectId",
          "leafId",
          "body"
        ]
      }
    },
    {
      "name": "allure_paths",
      "description": "Find all paths to test case in tree",
      "inputSchema": {
        "type": "object",
        "properties": {
          "treeId": {
            "type": "number",
            "description": "treeId"
          },
          "testCaseId": {
            "type": "number",
            "description": "testCaseId"
          }
        },
        "required": [
          "treeId",
          "testCaseId"
        ]
      }
    },
    {
      "name": "allure_getRunStats_1",
      "description": "Get run information",
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
      "name": "allure_suggest_6",
      "description": "Tree groups suggest",
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
        },
        "required": [
          "projectId"
        ]
      }
    }
  ];

export async function handleTestCaseTreeControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_countLeaves_3': {
        const { projectId, search, treeId, filterId, deleted, path } = args;
        const queryParams = { projectId, search, treeId, filterId, deleted, path };
        const result = await client.get(`/api/testcasetree/countleaves`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getGroups': {
        const { projectId, search, treeId, filterId, path, withEmptyCategories, page, size, sort, baseRql } = args;
        const queryParams = { projectId, search, treeId, filterId, path, withEmptyCategories, page, size, sort, baseRql };
        const result = await client.get(`/api/testcasetree/group`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addGroup_1': {
        const { projectId, filterId, search, treeId, path, baseRql, body } = args;
        const queryParams = { projectId, filterId, search, treeId, path, baseRql };
        const result = await client.post(`/api/testcasetree/group`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_renameGroup_1': {
        const { projectId, filterId, search, treeId, path, baseRql, body } = args;
        const queryParams = { projectId, filterId, search, treeId, path, baseRql };
        const result = await client.post(`/api/testcasetree/group/rename`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getJobsInfo': {
        const { body } = args;
        const result = await client.post(`/api/testcasetree/job`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getLeaves': {
        const { projectId, search, treeId, filterId, path, page, size, sort, baseRql } = args;
        const queryParams = { projectId, search, treeId, filterId, path, page, size, sort, baseRql };
        const result = await client.get(`/api/testcasetree/leaf`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_addLeaf_1': {
        const { projectId, treeId, path, body } = args;
        const queryParams = { projectId, treeId, path };
        const result = await client.post(`/api/testcasetree/leaf`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_renameLeaf_1': {
        const { projectId, leafId, body } = args;
        const queryParams = { projectId, leafId };
        const result = await client.post(`/api/testcasetree/leaf/rename`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_paths': {
        const { treeId, testCaseId } = args;
        const queryParams = { treeId, testCaseId };
        const result = await client.get(`/api/testcasetree/paths`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getRunStats_1': {
        const { body } = args;
        const result = await client.post(`/api/testcasetree/runstats`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_6': {
        const { query, projectId, treeId, path, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, treeId, path, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/testcasetree/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`TestCaseTreeController operation failed: ${error.message}`);
  }
}
