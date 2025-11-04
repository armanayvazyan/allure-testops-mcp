/**
 * UploadController - MCP Tools
 * Generated from Swagger specification
 */

import { AllureClient } from '../allure-client.js';

export const uploadControllerTools = [
    {
      "name": "allure_uploadResults",
      "description": "Upload test results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "id"
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
      "name": "allure_uploadResultsArchives",
      "description": "Upload archives with test results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "id"
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
      "name": "allure_uploadResultsFiles",
      "description": "Upload files with test results",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "id"
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
      "name": "allure_getJobRunByUid",
      "description": "Get information about job run by id",
      "inputSchema": {
        "type": "object",
        "properties": {
          "projectId": {
            "type": "number",
            "description": "projectId"
          },
          "jobUid": {
            "type": "string",
            "description": "jobUid"
          },
          "jobRunUid": {
            "type": "string",
            "description": "jobRunUid"
          },
          "jobRunId": {
            "type": "number",
            "description": "jobRunId"
          }
        },
        "required": [
          "projectId",
          "jobUid",
          "jobRunUid",
          "jobRunId"
        ]
      }
    },
    {
      "name": "allure_start",
      "description": "Notifies about external job run start",
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
      "name": "allure_sessionJobRun",
      "description": "Creates test session for manual upload",
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
      "name": "allure_start_1",
      "description": "Notifies about external job run start",
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
      "name": "allure_stop",
      "description": "Notifies about external job run stop",
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

export async function handleUploadControllerTool(
  client: AllureClient,
  toolName: string,
  args: any,
  defaultProjectId: string
): Promise<string> {
  try {
    switch (toolName) {
      case 'allure_uploadResults': {
        const { id, body } = args;
        const queryParams = { id };
        const result = await client.post(`/api/upload`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_uploadResultsArchives': {
        const { id, body } = args;
        const queryParams = { id };
        const result = await client.post(`/api/upload/archive`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_uploadResultsFiles': {
        const { id, body } = args;
        const queryParams = { id };
        const result = await client.post(`/api/upload/file`, body, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_getJobRunByUid': {
        const { projectId, jobUid, jobRunUid, jobRunId } = args;
        const queryParams = { projectId, jobUid, jobRunUid, jobRunId };
        const result = await client.get(`/api/upload/jobrun`, queryParams);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_start': {
        const { body } = args;
        const result = await client.post(`/api/upload/run`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_sessionJobRun': {
        const { body } = args;
        const result = await client.post(`/api/upload/session`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_start_1': {
        const { body } = args;
        const result = await client.post(`/api/upload/start`, body);
        return JSON.stringify(result, null, 2);
      }

      case 'allure_stop': {
        const { body } = args;
        const result = await client.post(`/api/upload/stop`, body);
        return JSON.stringify(result, null, 2);
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    throw new Error(`UploadController operation failed: ${error.message}`);
  }
}
