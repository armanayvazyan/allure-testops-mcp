/**
 * IntegrationController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const integrationControllerTools = [
    {
      "name": "allure_getIntegrations",
      "description": "GET /api/integration",
      "inputSchema": {
        "type": "object",
        "properties": {
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
      "name": "allure_create_38",
      "description": "POST /api/integration",
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
      "name": "allure_getAvailableIntegrations",
      "description": "GET /api/integration/available",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "query"
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
      "name": "allure_getGlobalFields",
      "description": "GET /api/integration/globalfields",
      "inputSchema": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "type"
          },
          "integrationId": {
            "type": "number",
            "description": "integrationId"
          }
        },
        "required": [
          "type",
          "integrationId"
        ]
      }
    },
    {
      "name": "allure_createProjectIntegration",
      "description": "POST /api/integration/project",
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
      "name": "allure_validate_3",
      "description": "POST /api/integration/project/validate",
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
      "name": "allure_getProjectIntegrations",
      "description": "GET /api/integration/project/{projectId}",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
      "name": "allure_getProjectAvailableIntegrations",
      "description": "GET /api/integration/project/{projectId}/available",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
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
      "name": "allure_getProjectIntegrationFields",
      "description": "GET /api/integration/projectfields",
      "inputSchema": {
        "type": "object",
        "properties": {
          "integrationId": {
            "type": "number",
            "description": "integrationId"
          },
          "projectId": {
            "type": "number",
            "description": "projectId"
          }
        },
        "required": [
          "integrationId",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_suggest_16",
      "description": "Suggest integrations",
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
          "operation": {
            "type": "array",
            "description": "operation",
            "items": {
              "type": "string"
            }
          },
          "integrationType": {
            "type": "array",
            "description": "integrationType",
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
      "name": "allure_validate_2",
      "description": "POST /api/integration/validate",
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
      "name": "allure_deleteById_3",
      "description": "DELETE /api/integration/{id}",
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
      "name": "allure_findOneById",
      "description": "GET /api/integration/{id}",
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
      "name": "allure_patch_34",
      "description": "PATCH /api/integration/{id}",
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
      "name": "allure_getIntegrationProjects",
      "description": "GET /api/integration/{id}/project",
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
          },
          "my": {
            "type": "boolean",
            "description": "my"
          },
          "favorite": {
            "type": "boolean",
            "description": "favorite"
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
      "name": "allure_deleteProjectIntegration",
      "description": "DELETE /api/integration/{integrationId}/project/{projectId}",
      "inputSchema": {
        "type": "object",
        "properties": {
          "integrationId": {
            "type": "number",
            "description": "Path parameter: integrationId"
          },
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
          }
        },
        "required": [
          "integrationId",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_findProjectIntegrationById",
      "description": "GET /api/integration/{integrationId}/project/{projectId}",
      "inputSchema": {
        "type": "object",
        "properties": {
          "integrationId": {
            "type": "number",
            "description": "Path parameter: integrationId"
          },
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
          }
        },
        "required": [
          "integrationId",
          "projectId"
        ]
      }
    },
    {
      "name": "allure_patchProjectIntegration",
      "description": "PATCH /api/integration/{integrationId}/project/{projectId}",
      "inputSchema": {
        "type": "object",
        "properties": {
          "integrationId": {
            "type": "number",
            "description": "Path parameter: integrationId"
          },
          "projectId": {
            "type": "number",
            "description": "Path parameter: projectId"
          },
          "body": {
            "type": "object",
            "description": "Request body"
          }
        },
        "required": [
          "integrationId",
          "projectId",
          "body"
        ]
      }
    }
  ];

export async function handleIntegrationControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_getIntegrations': {
        const { page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/integration`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_create_38': {
        const { body } = args;
        const result = await client.post(`/api/integration`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getAvailableIntegrations': {
        const { query, page, size, sort } = args;
        const queryParams = { query, page, size, sort };
        const result = await client.get(`/api/integration/available`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getGlobalFields': {
        const { type, integrationId } = args;
        const queryParams = { type, integrationId };
        const result = await client.get(`/api/integration/globalfields`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_createProjectIntegration': {
        const { body } = args;
        const result = await client.post(`/api/integration/project`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_validate_3': {
        const { body } = args;
        const result = await client.post(`/api/integration/project/validate`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getProjectIntegrations': {
        const { projectId, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/integration/project/${args.projectId}`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getProjectAvailableIntegrations': {
        const { projectId, page, size, sort } = args;
        const queryParams = { page, size, sort };
        const result = await client.get(`/api/integration/project/${args.projectId}/available`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getProjectIntegrationFields': {
        const { integrationId, projectId } = args;
        const queryParams = { integrationId, projectId };
        const result = await client.get(`/api/integration/projectfields`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_suggest_16': {
        const { query, projectId, id, ignoreId, operation, integrationType, page, size, sort } = args;
        const queryParams = { query, projectId, id, ignoreId, operation, integrationType, page, size, sort };
        const result = await client.get(`/api/integration/suggest`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_validate_2': {
        const { body } = args;
        const result = await client.post(`/api/integration/validate`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteById_3': {
        const { id } = args;
        await client.delete(`/api/integration/${args.id}`);
        return 'Successfully deleted';
      }

      case 'allure_findOneById': {
        const { id } = args;
        const result = await client.get(`/api/integration/${args.id}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patch_34': {
        const { id, body } = args;
        const result = await client.patch(`/api/integration/${args.id}`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getIntegrationProjects': {
        const { id, query, my, favorite, page, size, sort } = args;
        const queryParams = { query, my, favorite, page, size, sort };
        const result = await client.get(`/api/integration/${args.id}/project`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_deleteProjectIntegration': {
        const { integrationId, projectId } = args;
        await client.delete(`/api/integration/${args.integrationId}/project/${args.projectId}`);
        return 'Successfully deleted';
      }

      case 'allure_findProjectIntegrationById': {
        const { integrationId, projectId } = args;
        const result = await client.get(`/api/integration/${args.integrationId}/project/${args.projectId}`);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_patchProjectIntegration': {
        const { integrationId, projectId, body } = args;
        const result = await client.patch(`/api/integration/${args.integrationId}/project/${args.projectId}`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`IntegrationController operation failed: ${error.message}`);
  }
}
