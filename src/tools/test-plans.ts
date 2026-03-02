import { AllureApiClient } from "../client.js";
import { ToolBundle } from "./types.js";
import {
  asObject,
  getObjectPayload,
  getOptionalString,
  getRequiredId,
  pickPagination,
  resolveProjectId,
} from "./utils.js";

export function createTestPlanTools(
  client: AllureApiClient,
  defaultProjectId?: number,
): ToolBundle {
  const tools = [
    {
      name: "list_test_plans",
      description: "List test plans for a project.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          search: { type: "string" },
          page: { type: "number" },
          size: { type: "number" },
          sort: { type: "array", items: { type: "string" } },
        },
      },
    },
    {
      name: "get_test_plan",
      description: "Get a test plan by ID.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "create_test_plan",
      description: "Create a new test plan.",
      inputSchema: {
        type: "object" as const,
        properties: { payload: { type: "object", additionalProperties: true } },
        required: ["payload"],
      },
    },
    {
      name: "update_test_plan",
      description: "Update an existing test plan.",
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
      name: "delete_test_plan",
      description: "Delete a test plan by ID.",
      inputSchema: {
        type: "object" as const,
        properties: { id: { type: "number" } },
        required: ["id"],
      },
    },
    {
      name: "run_test_plan",
      description: "Run a test plan by ID.",
      inputSchema: {
        type: "object" as const,
        properties: {
          id: { type: "number" },
          payload: { type: "object", additionalProperties: true },
        },
        required: ["id"],
      },
    },
  ];

  const handlers = {
    list_test_plans: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client, defaultProjectId);
      return client.get("/api/testplan", {
        projectId,
        search: getOptionalString(args, "search"),
        ...pickPagination(args),
      });
    },
    get_test_plan: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.get(`/api/testplan/${getRequiredId(args)}`);
    },
    create_test_plan: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.post("/api/testplan", getObjectPayload(args));
    },
    update_test_plan: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.patch(`/api/testplan/${getRequiredId(args)}`, getObjectPayload(args));
    },
    delete_test_plan: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return client.delete(`/api/testplan/${getRequiredId(args)}`);
    },
    run_test_plan: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const payload = args.payload;
      if (
        payload !== undefined &&
        (typeof payload !== "object" || payload === null || Array.isArray(payload))
      ) {
        throw new Error("\"payload\" must be an object when provided.");
      }
      return client.post(`/api/testplan/${getRequiredId(args)}/run`, payload);
    },
  };

  return { tools, handlers };
}
