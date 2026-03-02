import { AllureApiClient } from "../client.js";
import { ToolBundle } from "./types.js";
import {
  asObject,
  getObjectPayload,
  getOptionalNumber,
  getOptionalString,
  getRequiredId,
  getRequiredString,
  pickPagination,
  resolveProjectId,
} from "./utils.js";

export function createTestResultTools(
  client: AllureApiClient,
  defaultProjectId?: number,
): ToolBundle {
  const tools = [
    {
      name: "list_test_results",
      description: "List test results for a launch.",
      inputSchema: {
        type: "object" as const,
        properties: {
          launchId: { type: "number" },
          search: { type: "string" },
          filterId: { type: "number" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
        required: ["launchId"],
      },
    },
    {
      name: "search_test_results",
      description: "Search test results by AQL query.",
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
      name: "get_test_result",
      description: "Get a test result by ID.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "create_test_result",
      description: "Create a new test result.",
      inputSchema: {
        type: "object" as const,
        properties: { payload: { type: "object", additionalProperties: true } },
        required: ["payload"],
      },
    },
    {
      name: "update_test_result",
      description: "Update an existing test result.",
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
      name: "get_test_result_history",
      description: "Get history for a test result.",
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
      name: "assign_test_result",
      description: "Assign a test result. payload must include username.",
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
      name: "resolve_test_result",
      description: "Resolve a test result. payload must include status.",
      inputSchema: {
        type: "object" as const,
        properties: {
          id: { type: "number" },
          payload: { type: "object", additionalProperties: true },
        },
        required: ["id", "payload"],
      },
    },
  ];

  const handlers = {
    list_test_results: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get("/api/testresult", {
        launchId: getRequiredId(args, "launchId"),
        search: getOptionalString(args, "search"),
        filterId: getOptionalNumber(args, "filterId"),
        ...pickPagination(args),
      });
    },
    search_test_results: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get("/api/testresult/__search", {
        projectId,
        rql: getRequiredString(args, "rql"),
        ...pickPagination(args),
      });
    },
    get_test_result: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testresult/${getRequiredId(args)}`);
    },
    create_test_result: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post("/api/testresult", getObjectPayload(args));
    },
    update_test_result: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.patch(
        `/api/testresult/${getRequiredId(args)}`,
        getObjectPayload(args),
      );
    },
    get_test_result_history: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testresult/${getRequiredId(args)}/history`, pickPagination(args));
    },
    assign_test_result: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post(
        `/api/testresult/${getRequiredId(args)}/assign`,
        getObjectPayload(args),
      );
    },
    resolve_test_result: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post(
        `/api/testresult/${getRequiredId(args)}/resolve`,
        getObjectPayload(args),
      );
    },
  };

  return { tools, handlers };
}
