import type { AllureApiClient } from "../client.js";
import * as api from "../api/test-cases.js";
import type { ToolBundle } from "./types.js";
import {
  asObject,
  ensureProjectIdInPayload,
  getOptionalBoolean,
  getObjectPayload,
  getOptionalNumber,
  getOptionalString,
  getRequiredId,
  getRequiredNumber,
  getRequiredString,
  pickPagination,
  resolveProjectId,
} from "./utils.js";

type ToolObject = Record<string, unknown>;
type BulkTag = { id?: number; name?: string };
type BulkExternalLink = { url: string; name?: string; type?: string };

function asArray(value: unknown): unknown[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    throw new Error("Expected an array.");
  }
  return value;
}

function getBulkIdList(
  args: ToolObject,
  singleKey: string,
  multipleKey: string,
  entityLabel: string,
): number[] {
  const ids: number[] = [];

  const single = args[singleKey];
  if (single !== undefined) {
    if (typeof single !== "number" || Number.isNaN(single)) {
      throw new Error(`"${singleKey}" must be a number when provided.`);
    }
    ids.push(single);
  }

  const multiple = args[multipleKey];
  if (multiple !== undefined) {
    const values = asArray(multiple);
    if (!values || values.some((item) => typeof item !== "number" || Number.isNaN(item))) {
      throw new Error(`"${multipleKey}" must be an array of numbers when provided.`);
    }
    ids.push(...(values as number[]));
  }

  if (ids.length === 0) {
    throw new Error(
      `Either "${singleKey}" or "${multipleKey}" must be provided with at least one ${entityLabel} ID.`,
    );
  }

  return [...new Set(ids)];
}

function normalizeBulkTags(args: ToolObject): BulkTag[] {
  const items: unknown[] = [];
  if (args.tag !== undefined) {
    items.push(args.tag);
  }
  if (args.tags !== undefined) {
    const tags = asArray(args.tags);
    if (!tags) {
      throw new Error("\"tags\" must be an array when provided.");
    }
    items.push(...tags);
  }

  if (items.length === 0) {
    throw new Error("Either \"tag\" or \"tags\" must be provided with at least one tag.");
  }

  return items.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`"tags[${index}]" must be an object.`);
    }
    const row = item as ToolObject;
    const id = typeof row.id === "number" ? row.id : undefined;
    const name = typeof row.name === "string" ? row.name : undefined;
    if (id === undefined && (name === undefined || name.trim().length === 0)) {
      throw new Error(`"tags[${index}]" must include at least one of "id" or non-empty "name".`);
    }
    return {
      ...(id !== undefined ? { id } : {}),
      ...(name !== undefined ? { name } : {}),
    };
  });
}

function extractCustomFieldIds(payload: unknown): number[] {
  if (!Array.isArray(payload)) {
    return [];
  }
  const ids = new Set<number>();
  for (const entry of payload) {
    if (entry && typeof entry === "object" && !Array.isArray(entry)) {
      const row = entry as ToolObject;
      const cf = row.customField;
      if (cf && typeof cf === "object" && !Array.isArray(cf)) {
        const id = (cf as ToolObject).id;
        if (typeof id === "number" && !Number.isNaN(id)) {
          ids.add(id);
        }
      }
    }
  }
  return [...ids];
}

function normalizeBulkExternalLinks(args: ToolObject): BulkExternalLink[] {
  const items: unknown[] = [];
  if (args.link !== undefined) {
    items.push(args.link);
  }
  if (args.links !== undefined) {
    const links = asArray(args.links);
    if (!links) {
      throw new Error("\"links\" must be an array when provided.");
    }
    items.push(...links);
  }

  if (items.length === 0) {
    throw new Error("Either \"link\" or \"links\" must be provided with at least one external link.");
  }

  return items.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`"links[${index}]" must be an object.`);
    }
    const row = item as ToolObject;
    const url = typeof row.url === "string" ? row.url.trim() : "";
    if (url.length === 0) {
      throw new Error(`"links[${index}].url" must be a non-empty string.`);
    }
    const name = row.name;
    if (name !== undefined && typeof name !== "string") {
      throw new Error(`"links[${index}].name" must be a string when provided.`);
    }
    const type = row.type;
    if (type !== undefined && typeof type !== "string") {
      throw new Error(`"links[${index}].type" must be a string when provided.`);
    }
    return {
      url,
      ...(typeof name === "string" ? { name } : {}),
      ...(typeof type === "string" ? { type } : {}),
    };
  });
}

export function createTestCaseTools(
  client: AllureApiClient,
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
      description:
        "Search test cases by RQL query. " +
        "RQL examples: " +
        'cf["Feature"] = "Auth" — match custom field value; ' +
        'cf["Feature"] is empty — field not set; ' +
        'not cf["Feature"] = "Auth" — negation; ' +
        'cf["Suite"] = "API" and cf["Feature"] is empty — combined conditions; ' +
        "name ~ \"login\" — name contains substring; " +
        "tag = \"smoke\" — filter by tag. " +
        "Use page/size for pagination; the API may truncate large result sets.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          rql: {
            type: "string",
            description:
              "RQL query string. Operators: = (equals), ~ (contains), is empty (field not set), " +
              "not (negation), and/or (combinators). " +
              'Custom field syntax: cf["FieldName"]. Example: cf["Feature"] = "Auth"',
          },
          page: { type: "number", description: "Page number (0-based)." },
          size: { type: "number", description: "Page size (default varies by server)." },
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
        "Update an existing test case. " +
        "WARNING: payload.customFields REPLACES all custom fields — any field not included will be removed. " +
        "To update a single custom field safely, use set_test_case_custom_fields or " +
        "bulk_set_test_case_custom_fields instead. " +
        "payload.customFields supports values like { customField: { id }, id, name }.",
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
      name: "add_test_case_tags_bulk",
      description:
        "Add one or multiple tags to one or multiple test cases using bulk API.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          testCaseId: { type: "number" },
          testCaseIds: { type: "array", items: { type: "number" } },
          tag: { type: "object", additionalProperties: true },
          tags: { type: "array", items: { type: "object" } },
        },
      },
    },
    {
      name: "remove_test_case_tags_bulk",
      description:
        "Remove one or multiple tags from one or multiple test cases using bulk API.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          testCaseId: { type: "number" },
          testCaseIds: { type: "array", items: { type: "number" } },
          tagId: { type: "number" },
          tagIds: { type: "array", items: { type: "number" } },
        },
      },
    },
    {
      name: "add_test_case_external_links_bulk",
      description:
        "Add one or multiple external links to one or multiple test cases using bulk API.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          testCaseId: { type: "number" },
          testCaseIds: { type: "array", items: { type: "number" } },
          link: { type: "object", additionalProperties: true },
          links: { type: "array", items: { type: "object" } },
        },
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
      description:
        "Add custom field values for a test case via bulk API. " +
        "NOTE: This ADDS values without removing existing ones. For multi-select fields, " +
        "the test case may end up with both old and new values. " +
        "To replace values, use remove_test_case_custom_fields first, then this tool. " +
        "Or use bulk_set_test_case_custom_fields with mode=\"replace\". " +
        "Supports grouped values [{ customField: { id }, values: [{ id|name }] }] " +
        "and flat values [{ id|name, customField: { id } }].",
      inputSchema: {
        type: "object" as const,
        properties: {
          testCaseId: { type: "number" },
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          payload: { type: "array", items: { type: "object" } },
        },
        required: ["testCaseId", "payload"],
      },
    },
    {
      name: "remove_test_case_custom_fields",
      description:
        "Remove custom field values from one or multiple test cases via bulk API. " +
        "Pass the custom field IDs whose values should be cleared from the specified test cases.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          testCaseId: { type: "number", description: "Single test case ID." },
          testCaseIds: { type: "array", items: { type: "number" }, description: "Multiple test case IDs." },
          customFieldId: { type: "number", description: "Single custom field ID to clear." },
          customFieldIds: { type: "array", items: { type: "number" }, description: "Multiple custom field IDs to clear." },
        },
      },
    },
    {
      name: "bulk_set_test_case_custom_fields",
      description:
        "Set custom field values on multiple test cases at once. " +
        "When mode is \"replace\" (default), existing values for the specified fields are removed " +
        "before adding new ones, preventing unintended data accumulation. " +
        "When mode is \"add\", values are added without removing existing ones. " +
        "Payload format: [{ customField: { id }, values: [{ id|name }] }] or " +
        "[{ id|name, customField: { id } }].",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          testCaseId: { type: "number", description: "Single test case ID." },
          testCaseIds: { type: "array", items: { type: "number" }, description: "Multiple test case IDs." },
          mode: {
            type: "string",
            enum: ["replace", "add"],
            description: "\"replace\" (default): removes existing values for the specified fields before adding. \"add\": appends without removing.",
          },
          payload: { type: "array", items: { type: "object" } },
        },
        required: ["payload"],
      },
    },
    {
      name: "delete_custom_field_value",
      description:
        "Delete a custom field value definition. The value must not be in use by any test cases. " +
        "Use this to clean up orphaned values after reorganizing test cases.",
      inputSchema: {
        type: "object" as const,
        properties: {
          valueId: { type: "number", description: "The ID of the custom field value to delete." },
        },
        required: ["valueId"],
      },
    },
    {
      name: "rename_custom_field_value",
      description:
        "Rename a custom field value. All test cases using this value will automatically reflect the new name.",
      inputSchema: {
        type: "object" as const,
        properties: {
          valueId: { type: "number", description: "The ID of the custom field value to rename." },
          name: { type: "string", description: "The new name for the value." },
        },
        required: ["valueId", "name"],
      },
    },
    {
      name: "merge_custom_field_values",
      description:
        "Merge two custom field values: reassign all test cases from the source value to the target value, " +
        "then delete the source value. Useful for consolidating duplicate or similar values.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          customFieldId: { type: "number", description: "The custom field ID (e.g. -2 for Feature)." },
          sourceValueId: { type: "number", description: "The value to merge FROM (will be deleted)." },
          targetValueId: { type: "number", description: "The value to merge INTO (will be kept)." },
        },
        required: ["customFieldId", "sourceValueId", "targetValueId"],
      },
    },
    {
      name: "search_test_cases_by_missing_field",
      description:
        "Find test cases where a specific custom field is not set. " +
        "Convenience wrapper that builds the RQL query cf[\"FieldName\"] is empty.",
      inputSchema: {
        type: "object" as const,
        properties: {
          projectId: { type: "number" },
          projectName: {
            type: "string",
            description: "Project name (alternative to projectId).",
          },
          fieldName: { type: "string", description: "The custom field name (e.g. \"Feature\", \"Suite\")." },
          additionalRql: {
            type: "string",
            description: "Optional extra RQL filter to combine with the missing-field condition using AND.",
          },
          page: { type: "number", description: "Page number (0-based)." },
          size: { type: "number", description: "Page size." },
          sort: { type: "array", items: { type: "string" } },
        },
        required: ["fieldName"],
      },
    },
  ];

  const handlers = {
    list_test_cases: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      return api.listTestCases(client, projectId, {
        search: getOptionalString(args, "search"),
        filterId: getOptionalNumber(args, "filterId"),
        ...pickPagination(args),
      });
    },
    search_test_cases: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      return api.searchTestCases(client, projectId, getRequiredString(args, "rql"), {
        ...pickPagination(args),
      });
    },
    get_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.getTestCase(client, getRequiredId(args));
    },
    create_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const payload = ensureProjectIdInPayload(getObjectPayload(args), client);
      return api.createTestCase(client, payload);
    },
    update_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.updateTestCase(client, getRequiredId(args), getObjectPayload(args));
    },
    delete_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.deleteTestCase(client, getRequiredId(args));
    },
    add_test_case_tags_bulk: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const testCaseIds = getBulkIdList(args, "testCaseId", "testCaseIds", "test case");
      const tags = normalizeBulkTags(args);
      return api.addTagsToTestCases(client, projectId, testCaseIds, tags);
    },
    remove_test_case_tags_bulk: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const testCaseIds = getBulkIdList(args, "testCaseId", "testCaseIds", "test case");
      const tagIds = getBulkIdList(args, "tagId", "tagIds", "tag");
      return api.removeTagsFromTestCases(client, projectId, testCaseIds, tagIds);
    },
    add_test_case_external_links_bulk: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const testCaseIds = getBulkIdList(args, "testCaseId", "testCaseIds", "test case");
      const links = normalizeBulkExternalLinks(args);
      return api.addExternalLinksToTestCases(client, projectId, testCaseIds, links);
    },
    get_test_case_overview: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.getTestCaseOverview(client, getRequiredId(args, "testCaseId"));
    },
    get_test_case_history: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.getTestCaseHistory(client, getRequiredId(args), pickPagination(args));
    },
    get_test_case_scenario: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.getTestCaseScenario(client, getRequiredId(args));
    },
    get_test_case_tags: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.getTestCaseTags(client, getRequiredId(args, "testCaseId"));
    },
    set_test_case_tags: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.setTestCaseTags(client, getRequiredId(args, "testCaseId"), args.payload);
    },
    get_test_case_issues: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.getTestCaseIssues(client, getRequiredId(args, "testCaseId"));
    },
    set_test_case_issues: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.setTestCaseIssues(client, getRequiredId(args, "testCaseId"), args.payload);
    },
    restore_test_case: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.restoreTestCase(client, getRequiredId(args));
    },
    list_project_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      return api.listProjectCustomFields(client, projectId, {
        query: getOptionalString(args, "query"),
        ...pickPagination(args),
      });
    },
    list_custom_field_values: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      return api.listCustomFieldValues(
        client,
        projectId,
        getRequiredId(args, "customFieldId"),
        {
        query: getOptionalString(args, "query"),
        global: getOptionalBoolean(args, "global"),
        testCaseSearch: getOptionalString(args, "testCaseSearch"),
        ...pickPagination(args),
        },
      );
    },
    get_test_case_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      return api.getTestCaseCustomFields(client, getRequiredId(args, "testCaseId"), projectId);
    },
    set_test_case_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const testCaseId = getRequiredId(args, "testCaseId");
      return api.setTestCaseCustomFields(client, projectId, testCaseId, args.payload);
    },
    remove_test_case_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const testCaseIds = getBulkIdList(args, "testCaseId", "testCaseIds", "test case");
      const customFieldIds = getBulkIdList(args, "customFieldId", "customFieldIds", "custom field");
      return api.removeCustomFieldsFromTestCases(client, projectId, testCaseIds, customFieldIds);
    },
    bulk_set_test_case_custom_fields: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const testCaseIds = getBulkIdList(args, "testCaseId", "testCaseIds", "test case");
      const mode = getOptionalString(args, "mode") ?? "replace";

      if (mode === "replace") {
        const fieldIds = extractCustomFieldIds(args.payload);
        if (fieldIds.length > 0) {
          await api.removeCustomFieldsFromTestCases(client, projectId, testCaseIds, fieldIds);
        }
      }

      return api.bulkSetTestCaseCustomFields(client, projectId, testCaseIds, args.payload);
    },
    delete_custom_field_value: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.deleteCustomFieldValue(client, getRequiredId(args, "valueId"));
    },
    rename_custom_field_value: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      return api.renameCustomFieldValue(
        client,
        getRequiredId(args, "valueId"),
        getRequiredString(args, "name"),
      );
    },
    merge_custom_field_values: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const customFieldId = getRequiredNumber(args, "customFieldId");
      const sourceValueId = getRequiredNumber(args, "sourceValueId");
      const targetValueId = getRequiredNumber(args, "targetValueId");

      const searchResult = await api.searchTestCases(client, projectId, `cf[${customFieldId}] = ${sourceValueId}`, {
        size: 2000,
      }) as { content?: Array<{ id: number }> };

      const testCaseIds = Array.isArray(searchResult?.content)
        ? searchResult.content.map((tc) => tc.id).filter((id): id is number => typeof id === "number")
        : [];

      if (testCaseIds.length > 0) {
        await api.removeCustomFieldsFromTestCases(client, projectId, testCaseIds, [customFieldId]);
        await api.bulkSetTestCaseCustomFields(client, projectId, testCaseIds, [
          { customField: { id: customFieldId }, values: [{ id: targetValueId }] },
        ]);
      }

      await api.deleteCustomFieldValue(client, sourceValueId);

      return {
        merged: true,
        testCasesReassigned: testCaseIds.length,
        sourceValueId,
        targetValueId,
        sourceDeleted: true,
      };
    },
    search_test_cases_by_missing_field: async (rawArgs: unknown) => {
      const args = asObject(rawArgs);
      const projectId = await resolveProjectId(args, client);
      const fieldName = getRequiredString(args, "fieldName");
      const additionalRql = getOptionalString(args, "additionalRql");

      let rql = `cf["${fieldName}"] is empty`;
      if (additionalRql) {
        rql = `${rql} and ${additionalRql}`;
      }

      return api.searchTestCases(client, projectId, rql, {
        ...pickPagination(args),
      });
    },
  };

  return { tools, handlers };
}
