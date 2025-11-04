/**
 * DefectController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const defectControllerTools = [
    {
      "name": "allure_findAllByProjectId",
      "description": "GET /api/defect",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "nameFilter": {
            "type": "string",
            "description": "nameFilter"
          },
          "status": {
            "type": "array",
            "description": "status",
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
    },
    {
      "name": "allure_create_46",
      "description": "POST /api/defect",
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
      "name": "allure_suggest_21",
      "description": "GET /api/defect/suggest",
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
      "name": "allure_delete_37",
      "description": "DELETE /api/defect/{id}",
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
      "name": "allure_findById_1",
      "description": "GET /api/defect/{id}",
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
      "name": "allure_patch_43",
      "description": "PATCH /api/defect/{id}",
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
      "name": "allure_createIssue",
      "description": "POST /api/defect/{id}/createissue",
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
      "name": "allure_unlinkIssue",
      "description": "DELETE /api/defect/{id}/issue",
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
      "name": "allure_linkIssue",
      "description": "POST /api/defect/{id}/issue",
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
      "name": "allure_getLaunches",
      "description": "GET /api/defect/{id}/launch",
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
      "name": "allure_getMatchers",
      "description": "GET /api/defect/{id}/matcher",
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
      "name": "allure_getTestCases_2",
      "description": "GET /api/defect/{id}/testcase",
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
      "name": "allure_getTestResults",
      "description": "GET /api/defect/{id}/testresult",
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
    }
  ];

export async function handleDefectControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_findAllByProjectId': {
        const { projectId, nameFilter, status, page, size, sort } = args;
        const queryParams = { projectId, nameFilter, status, page, size, sort };
        const result = await client.get(`/api/defect`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_46': {
        const { body } = args;
        const result = await client.post(`/api/defect`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_21': {
        const { query, projectId, id, ignoreId, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, page, size, sort };
        const result = await client.get(`/api/defect/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_delete_37': {
        const { id } = args;
        await client.delete(`/api/defect/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findById_1': {
        const { id } = args;
        const result = await client.get(`/api/defect/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_43': {
        const { id, body } = args;
        const result = await client.patch(`/api/defect/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_createIssue': {
        const { id, body } = args;
        const result = await client.post(`/api/defect/${args.id}/createissue`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_unlinkIssue': {
        const { id } = args;
        await client.delete(`/api/defect/${args.id}/issue`);
        return 'Successfully deleted';
      }

      case 'allure_linkIssue': {
        const { id, body } = args;
        const result = await client.post(`/api/defect/${args.id}/issue`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getLaunches': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/defect/${args.id}/launch`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getMatchers': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/defect/${args.id}/matcher`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getTestCases_2': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/defect/${args.id}/testcase`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getTestResults': {
        const { id, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/defect/${args.id}/testresult`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`DefectController operation failed: ${error.message}`);
  }
}
