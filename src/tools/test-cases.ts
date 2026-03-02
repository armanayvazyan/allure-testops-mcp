import { AllureApiClient } from "../client.js";
import { ToolBundle } from "./types.js";
import {
  asObject,
  ensureProjectIdInPayload,
  getOptionalBoolean,
  getObjectPayload,
  getOptionalNumber,
  getOptionalString,
  getRequiredId,
  getRequiredString,
  pickPagination,
  resolveProjectId,
} from "./utils.js";

export function createTestCaseTools(
  client: AllureApiClient,
  defaultProjectId?: number,
): ToolBundle {
  const tools = [
    {
      name: "list_test_cases",
      description: "List test cases for a project.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          search: { type: "string" },
          filterId: { type: "number" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
      },
    },
    {
      name: "search_test_cases",
      description: "Search test cases by AQL query.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          rql: { type: "string" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
        required: ["rql"],
      },
    },
    {
      name: "get_test_case",
      description: "Get a test case by ID.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "create_test_case",
      description:
        "Create a new test case. payload.projectId defaults to ALLURE_PROJECT_ID env when omitted. payload.customFields supports values like { customField: { id }, id, name }.",
      inputSchema: {
        type: "object" as const,
        properties: {
          payload: { type: "object", additionalProperties: true },
        },
        required: ["payload"],
      },
    },
    {
      name: "update_test_case",
      description:
        "Update an existing test case. payload.customFields supports values like { customField: { id }, id, name }.",
      inputSchema: {
        type: "object" as const,
        properties: {
          id: { type: "number" },
          payload: { type: "object", additionalProperties: true },
        },
        required: ["id", "payload"],
      },
    },
    {
      name: "delete_test_case",
      description: "Delete a test case by ID.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "get_test_case_overview",
      description: "Get test case overview data.",
      inputSchema: {
        type: "object" as const,
        properties: { testCaseId: { type: "number" } },
        required: ["testCaseId"],
      },
    },
    {
      name: "get_test_case_history",
      description: "Get test case run history.",
      inputSchema: {
        type: "object" as const,
        properties: {
          id: { type: "number" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
        required: ["id"],
      },
    },
    {
      name: "get_test_case_scenario",
      description: "Get scenario for a test case.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "get_test_case_tags",
      description: "Get tags assigned to a test case.",
      inputSchema: {
        type: "object" as const,
        properties: { testCaseId: { type: "number" } },
        required: ["testCaseId"],
      },
    },
    {
      name: "set_test_case_tags",
      description: "Set tags for a test case.",
      inputSchema: {
        type: "object" as const,
        properties: {
          testCaseId: { type: "number" },
          payload: { type: "array", items: { type: "object" } },
        },
        required: ["testCaseId", "payload"],
      },
    },
    {
      name: "get_test_case_issues",
      description: "Get linked issues for a test case.",
      inputSchema: {
        type: "object" as const,
        properties: { testCaseId: { type: "number" } },
        required: ["testCaseId"],
      },
    },
    {
      name: "set_test_case_issues",
      description: "Set linked issues for a test case.",
      inputSchema: {
        type: "object" as const,
        properties: {
          testCaseId: { type: "number" },
          payload: { type: "array", items: { type: "object" } },
        },
        required: ["testCaseId", "payload"],
      },
    },
    {
      name: "restore_test_case",
      description: "Restore a deleted test case.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "list_project_custom_fields",
      description: "List custom fields configured for a project.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          query: { type: "string" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
      },
    },
    {
      name: "list_custom_field_values",
      description: "List values for a custom field in a project.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          customFieldId: { type: "number" },
          query: { type: "string" },
          global: { type: "boolean" },
          testCaseSearch: { type: "string" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
        required: ["customFieldId"],
      },
    },
    {
      name: "get_test_case_custom_fields",
      description: "Get custom field values for a test case.",
      inputSchema: {
        type: "object" as const,
        properties: {
          testCaseId: { type: "number" },
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
        },
        required: ["testCaseId"],
      },
    },
    {
      name: "set_test_case_custom_fields",
      description: "Update custom field values for a test case.",
      inputSchema: {
        type: "object" as const,
        properties: {
          testCaseId: { type: "number" },
          payload: { type: "array", items: { type: "object" } },
        },
        required: ["testCaseId", "payload"],
      },
    },
  ];

  const handlers = {
    list_test_cases: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get("/api/testcase", {
        projectId,
        search: getOptionalString(args, "search"),
        filterId: getOptionalNumber(args, "filterId"),
        ...pickPagination(args),
      });
    },
    search_test_cases: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get("/api/testcase/__search", {
        projectId,
        rql: getRequiredString(args, "rql"),
        ...pickPagination(args),
      });
    },
    get_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testcase/${getRequiredId(args)}`);
    },
    create_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const payload = ensureProjectIdInPayload(
        getObjectPayload(args),
        defaultProjectId,
      );
      return client.post("/api/testcase", payload);
    },
    update_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.patch(
        `/api/testcase/${getRequiredId(args)}`,
        getObjectPayload(args),
      );
    },
    delete_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.delete(`/api/testcase/${getRequiredId(args)}`);
    },
    get_test_case_overview: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testcase/${getRequiredId(args, "testCaseId")}/overview`);
    },
    get_test_case_history: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testcase/${getRequiredId(args)}/history`, pickPagination(args));
    },
    get_test_case_scenario: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testcase/${getRequiredId(args)}/scenario`);
    },
    get_test_case_tags: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testcase/${getRequiredId(args, "testCaseId")}/tag`);
    },
    set_test_case_tags: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post(
        `/api/testcase/${getRequiredId(args, "testCaseId")}/tag`,
        args.payload,
      );
    },
    get_test_case_issues: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testcase/${getRequiredId(args, "testCaseId")}/issue`);
    },
    set_test_case_issues: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post(
        `/api/testcase/${getRequiredId(args, "testCaseId")}/issue`,
        args.payload,
      );
    },
    restore_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post(`/api/testcase/${getRequiredId(args)}/restore`);
    },
    list_project_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get(`/api/project/${projectId}/cf`, {
        query: getOptionalString(args, "query"),
        ...pickPagination(args),
      });
    },
    list_custom_field_values: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get(`/api/project/${projectId}/cfv`, {
        customFieldId: getRequiredId(args, "customFieldId"),
        query: getOptionalString(args, "query"),
        global: getOptionalBoolean(args, "global"),
        testCaseSearch: getOptionalString(args, "testCaseSearch"),
        ...pickPagination(args),
      });
    },
    get_test_case_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get(`/api/testcase/${getRequiredId(args, "testCaseId")}/cfv`, {
        projectId,
      });
    },
    set_test_case_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const payload = args.payload;
      if (!Array.isArray(payload)) {
        throw new Error("\"payload\" must be an array.");
      }
      return client.patch(
        `/api/testcase/${getRequiredId(args, "testCaseId")}/cfv`,
        payload,
      );
    },
  };

  return { tools, handlers };
}
