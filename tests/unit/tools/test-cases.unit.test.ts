import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestCaseTools } from "../../../src/tools/test-cases.js";
import * as api from "../../../src/api/test-cases.js";
import {
  createMockClient,
  expectObjectSchemas,
  expectRequiredFields,
  expectSchemaProperty,
  expectToolHandlerParity,
} from "../tool-test-helpers.js";

vi.mock("../../../src/api/test-cases.js", () => ({
  listTestCases: vi.fn(),
  searchTestCases: vi.fn(),
  getTestCase: vi.fn(),
  createTestCase: vi.fn(),
  updateTestCase: vi.fn(),
  deleteTestCase: vi.fn(),
  addTagsToTestCases: vi.fn(),
  removeTagsFromTestCases: vi.fn(),
  addExternalLinksToTestCases: vi.fn(),
  getTestCaseOverview: vi.fn(),
  getTestCaseHistory: vi.fn(),
  getTestCaseScenario: vi.fn(),
  getTestCaseTags: vi.fn(),
  setTestCaseTags: vi.fn(),
  getTestCaseIssues: vi.fn(),
  setTestCaseIssues: vi.fn(),
  restoreTestCase: vi.fn(),
  listProjectCustomFields: vi.fn(),
  listCustomFieldValues: vi.fn(),
  getTestCaseCustomFields: vi.fn(),
  setTestCaseCustomFields: vi.fn(),
  removeCustomFieldsFromTestCases: vi.fn(),
  bulkSetTestCaseCustomFields: vi.fn(),
  deleteCustomFieldValue: vi.fn(),
  renameCustomFieldValue: vi.fn(),
}));

describe("createTestCaseTools", () => {
  const defaultProjectId = 101;
  const client = createMockClient(defaultProjectId);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defines tool schemas and handlers for every test case tool", () => {
    const bundle = createTestCaseTools(client as never);
    expectToolHandlerParity(bundle);
    expectObjectSchemas(bundle);
  });

  it("has expected required fields and schema properties", () => {
    const bundle = createTestCaseTools(client as never);

    expectRequiredFields(bundle.tools, "search_test_cases", ["rql"]);
    expectRequiredFields(bundle.tools, "get_test_case", ["id"]);
    expectRequiredFields(bundle.tools, "create_test_case", ["payload"]);
    expectRequiredFields(bundle.tools, "update_test_case", ["id", "payload"]);
    expectRequiredFields(bundle.tools, "set_test_case_tags", ["testCaseId", "payload"]);
    expectRequiredFields(bundle.tools, "set_test_case_issues", ["testCaseId", "payload"]);
    expectRequiredFields(bundle.tools, "set_test_case_custom_fields", ["testCaseId", "payload"]);
    expectRequiredFields(bundle.tools, "add_test_case_tags_bulk", []);
    expectRequiredFields(bundle.tools, "remove_test_case_tags_bulk", []);
    expectRequiredFields(bundle.tools, "add_test_case_external_links_bulk", []);
    expectSchemaProperty(bundle.tools, "list_test_cases", "projectId");
    expectSchemaProperty(bundle.tools, "list_test_cases", "projectName");
    expectSchemaProperty(bundle.tools, "list_custom_field_values", "customFieldId");
    expectSchemaProperty(bundle.tools, "add_test_case_tags_bulk", "testCaseIds");
    expectSchemaProperty(bundle.tools, "remove_test_case_tags_bulk", "tagIds");
    expectSchemaProperty(bundle.tools, "add_test_case_external_links_bulk", "links");
  });

  it("list and search handlers resolve project id and forward pagination", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.listTestCases).mockResolvedValueOnce([{ id: 1 }]);
    vi.mocked(api.searchTestCases).mockResolvedValueOnce([{ id: 2 }]);

    await bundle.handlers.list_test_cases({ search: "auth", page: 1, size: 50, sort: ["id,desc"] });
    await bundle.handlers.search_test_cases({ rql: "name = \"Auth\"", page: 2 });

    expect(api.listTestCases).toHaveBeenCalledWith(client, defaultProjectId, {
      search: "auth",
      filterId: undefined,
      page: 1,
      size: 50,
      sort: ["id,desc"],
    });
    expect(api.searchTestCases).toHaveBeenCalledWith(client, defaultProjectId, 'name = "Auth"', {
      page: 2,
      size: undefined,
      sort: undefined,
    });
  });

  it("search_test_cases validates rql", async () => {
    const bundle = createTestCaseTools(client as never);
    await expect(bundle.handlers.search_test_cases({})).rejects.toThrow(
      '"rql" must be a non-empty string.',
    );
  });

  it("create and update handlers validate payload object", async () => {
    const bundle = createTestCaseTools(client as never);
    await expect(bundle.handlers.create_test_case({ payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
    await expect(bundle.handlers.update_test_case({ id: 4, payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
  });

  it("create_test_case injects default project id into payload", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.createTestCase).mockResolvedValueOnce({ id: 3 });

    await bundle.handlers.create_test_case({ payload: { name: "A" } });

    expect(api.createTestCase).toHaveBeenCalledWith(client, { name: "A", projectId: defaultProjectId });
  });

  it("id-based get/update/delete/restore handlers call API", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.getTestCase).mockResolvedValueOnce({});
    vi.mocked(api.updateTestCase).mockResolvedValueOnce({});
    vi.mocked(api.deleteTestCase).mockResolvedValueOnce(undefined);
    vi.mocked(api.restoreTestCase).mockResolvedValueOnce({});

    await bundle.handlers.get_test_case({ id: 10 });
    await bundle.handlers.update_test_case({ id: 10, payload: { name: "B" } });
    await bundle.handlers.delete_test_case({ id: 10 });
    await bundle.handlers.restore_test_case({ id: 10 });

    expect(api.getTestCase).toHaveBeenCalledWith(client, 10);
    expect(api.updateTestCase).toHaveBeenCalledWith(client, 10, { name: "B" });
    expect(api.deleteTestCase).toHaveBeenCalledWith(client, 10);
    expect(api.restoreTestCase).toHaveBeenCalledWith(client, 10);
  });

  it("overview/history/scenario handlers forward expected arguments", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.getTestCaseOverview).mockResolvedValueOnce({});
    vi.mocked(api.getTestCaseHistory).mockResolvedValueOnce([]);
    vi.mocked(api.getTestCaseScenario).mockResolvedValueOnce({});

    await bundle.handlers.get_test_case_overview({ testCaseId: 20 });
    await bundle.handlers.get_test_case_history({ id: 20, size: 10 });
    await bundle.handlers.get_test_case_scenario({ id: 20 });

    expect(api.getTestCaseOverview).toHaveBeenCalledWith(client, 20);
    expect(api.getTestCaseHistory).toHaveBeenCalledWith(client, 20, {
      page: undefined,
      size: 10,
      sort: undefined,
    });
    expect(api.getTestCaseScenario).toHaveBeenCalledWith(client, 20);
  });

  it("tags and issues handlers use testCaseId and payload", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.getTestCaseTags).mockResolvedValueOnce([]);
    vi.mocked(api.setTestCaseTags).mockResolvedValueOnce([]);
    vi.mocked(api.getTestCaseIssues).mockResolvedValueOnce([]);
    vi.mocked(api.setTestCaseIssues).mockResolvedValueOnce([]);

    await bundle.handlers.get_test_case_tags({ testCaseId: 30 });
    await bundle.handlers.set_test_case_tags({ testCaseId: 30, payload: [] });
    await bundle.handlers.get_test_case_issues({ testCaseId: 30 });
    await bundle.handlers.set_test_case_issues({ testCaseId: 30, payload: [] });

    expect(api.getTestCaseTags).toHaveBeenCalledWith(client, 30);
    expect(api.setTestCaseTags).toHaveBeenCalledWith(client, 30, []);
    expect(api.getTestCaseIssues).toHaveBeenCalledWith(client, 30);
    expect(api.setTestCaseIssues).toHaveBeenCalledWith(client, 30, []);
  });

  it("bulk tag and external-link handlers normalize single and multiple inputs", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.addTagsToTestCases).mockResolvedValueOnce({});
    vi.mocked(api.removeTagsFromTestCases).mockResolvedValueOnce({});
    vi.mocked(api.addExternalLinksToTestCases).mockResolvedValueOnce({});

    await bundle.handlers.add_test_case_tags_bulk({
      testCaseId: 11,
      tag: { name: "smoke" },
    });
    await bundle.handlers.remove_test_case_tags_bulk({
      testCaseIds: [11, 12, 12],
      tagId: 3,
      tagIds: [4],
    });
    await bundle.handlers.add_test_case_external_links_bulk({
      testCaseIds: [11],
      links: [{ url: "https://example.local/case/11", type: "tms" }],
    });

    expect(api.addTagsToTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [11],
      [{ name: "smoke" }],
    );
    expect(api.removeTagsFromTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [11, 12],
      [3, 4],
    );
    expect(api.addExternalLinksToTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [11],
      [{ url: "https://example.local/case/11", type: "tms" }],
    );
  });

  it("bulk handlers validate missing required ids and payload entities", async () => {
    const bundle = createTestCaseTools(client as never);

    await expect(bundle.handlers.add_test_case_tags_bulk({ tags: [{ id: 1 }] })).rejects.toThrow(
      'Either "testCaseId" or "testCaseIds" must be provided with at least one test case ID.',
    );
    await expect(bundle.handlers.add_test_case_tags_bulk({ testCaseId: 1 })).rejects.toThrow(
      'Either "tag" or "tags" must be provided with at least one tag.',
    );
    await expect(bundle.handlers.remove_test_case_tags_bulk({ testCaseId: 1 })).rejects.toThrow(
      'Either "tagId" or "tagIds" must be provided with at least one tag ID.',
    );
    await expect(
      bundle.handlers.add_test_case_external_links_bulk({ testCaseId: 1, link: { name: "Docs" } }),
    ).rejects.toThrow('"links[0].url" must be a non-empty string.');
  });

  it("custom-field handlers resolve project id and validate required customFieldId", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.listProjectCustomFields).mockResolvedValueOnce([]);
    vi.mocked(api.listCustomFieldValues).mockResolvedValueOnce([]);
    vi.mocked(api.getTestCaseCustomFields).mockResolvedValueOnce([]);
    vi.mocked(api.setTestCaseCustomFields).mockResolvedValueOnce({});

    await bundle.handlers.list_project_custom_fields({ query: "severity" });
    await expect(bundle.handlers.list_custom_field_values({})).rejects.toThrow(
      '"customFieldId" must be a number.',
    );
    await bundle.handlers.list_custom_field_values({ customFieldId: 5 });
    await bundle.handlers.get_test_case_custom_fields({ testCaseId: 9 });
    await bundle.handlers.set_test_case_custom_fields({ testCaseId: 9, payload: [] });

    expect(api.listProjectCustomFields).toHaveBeenCalledWith(client, defaultProjectId, {
      query: "severity",
      page: undefined,
      size: undefined,
      sort: undefined,
    });
    expect(api.listCustomFieldValues).toHaveBeenCalledWith(client, defaultProjectId, 5, {
      query: undefined,
      global: undefined,
      testCaseSearch: undefined,
      page: undefined,
      size: undefined,
      sort: undefined,
    });
    expect(api.getTestCaseCustomFields).toHaveBeenCalledWith(client, 9, defaultProjectId);
    expect(api.setTestCaseCustomFields).toHaveBeenCalledWith(client, defaultProjectId, 9, []);
  });

  it("remove_test_case_custom_fields calls bulk cfv/remove API", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.removeCustomFieldsFromTestCases).mockResolvedValueOnce({});

    await bundle.handlers.remove_test_case_custom_fields({
      testCaseId: 100,
      customFieldId: -2,
    });

    expect(api.removeCustomFieldsFromTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [100],
      [-2],
    );
  });

  it("remove_test_case_custom_fields validates required ids", async () => {
    const bundle = createTestCaseTools(client as never);

    await expect(
      bundle.handlers.remove_test_case_custom_fields({ customFieldId: -2 }),
    ).rejects.toThrow('Either "testCaseId" or "testCaseIds" must be provided');

    await expect(
      bundle.handlers.remove_test_case_custom_fields({ testCaseId: 100 }),
    ).rejects.toThrow('Either "customFieldId" or "customFieldIds" must be provided');
  });

  it("bulk_set_test_case_custom_fields in replace mode removes then adds", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.removeCustomFieldsFromTestCases).mockResolvedValueOnce({});
    vi.mocked(api.bulkSetTestCaseCustomFields).mockResolvedValueOnce({});

    await bundle.handlers.bulk_set_test_case_custom_fields({
      testCaseIds: [10, 20],
      payload: [{ customField: { id: -2 }, values: [{ name: "Insights" }] }],
    });

    expect(api.removeCustomFieldsFromTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [10, 20],
      [-2],
    );
    expect(api.bulkSetTestCaseCustomFields).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [10, 20],
      [{ customField: { id: -2 }, values: [{ name: "Insights" }] }],
    );
  });

  it("bulk_set_test_case_custom_fields in add mode skips remove", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.bulkSetTestCaseCustomFields).mockResolvedValueOnce({});

    await bundle.handlers.bulk_set_test_case_custom_fields({
      testCaseId: 10,
      mode: "add",
      payload: [{ customField: { id: -2 }, values: [{ name: "Insights" }] }],
    });

    expect(api.removeCustomFieldsFromTestCases).not.toHaveBeenCalled();
    expect(api.bulkSetTestCaseCustomFields).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [10],
      [{ customField: { id: -2 }, values: [{ name: "Insights" }] }],
    );
  });

  it("delete_custom_field_value calls API with valueId", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.deleteCustomFieldValue).mockResolvedValueOnce({});

    await bundle.handlers.delete_custom_field_value({ valueId: 1234 });

    expect(api.deleteCustomFieldValue).toHaveBeenCalledWith(client, 1234);
  });

  it("rename_custom_field_value calls API with valueId and name", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.renameCustomFieldValue).mockResolvedValueOnce({});

    await bundle.handlers.rename_custom_field_value({ valueId: 1234, name: "New Name" });

    expect(api.renameCustomFieldValue).toHaveBeenCalledWith(client, 1234, "New Name");
  });

  it("merge_custom_field_values reassigns test cases and deletes source", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.searchTestCases).mockResolvedValueOnce({
      content: [{ id: 100 }, { id: 200 }],
    });
    vi.mocked(api.removeCustomFieldsFromTestCases).mockResolvedValueOnce({});
    vi.mocked(api.bulkSetTestCaseCustomFields).mockResolvedValueOnce({});
    vi.mocked(api.deleteCustomFieldValue).mockResolvedValueOnce({});

    const result = await bundle.handlers.merge_custom_field_values({
      customFieldId: -2,
      sourceValueId: 10,
      targetValueId: 20,
    });

    expect(api.searchTestCases).toHaveBeenCalled();
    expect(api.removeCustomFieldsFromTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [100, 200],
      [-2],
    );
    expect(api.bulkSetTestCaseCustomFields).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      [100, 200],
      [{ customField: { id: -2 }, values: [{ id: 20 }] }],
    );
    expect(api.deleteCustomFieldValue).toHaveBeenCalledWith(client, 10);
    expect(result).toEqual({
      merged: true,
      testCasesReassigned: 2,
      sourceValueId: 10,
      targetValueId: 20,
      sourceDeleted: true,
    });
  });

  it("search_test_cases_by_missing_field builds RQL query", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.searchTestCases).mockResolvedValueOnce({ content: [] });

    await bundle.handlers.search_test_cases_by_missing_field({
      fieldName: "Feature",
      page: 0,
      size: 50,
    });

    expect(api.searchTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      'cf["Feature"] is empty',
      { page: 0, size: 50, sort: undefined },
    );
  });

  it("search_test_cases_by_missing_field combines with additional RQL", async () => {
    const bundle = createTestCaseTools(client as never);
    vi.mocked(api.searchTestCases).mockResolvedValueOnce({ content: [] });

    await bundle.handlers.search_test_cases_by_missing_field({
      fieldName: "Feature",
      additionalRql: 'cf["Suite"] = "API"',
    });

    expect(api.searchTestCases).toHaveBeenCalledWith(
      client,
      defaultProjectId,
      'cf["Feature"] is empty and cf["Suite"] = "API"',
      { page: undefined, size: undefined, sort: undefined },
    );
  });

  it("new tools are included in schema and handler parity check", () => {
    const bundle = createTestCaseTools(client as never);
    const toolNames = bundle.tools.map((t) => t.name);

    expect(toolNames).toContain("remove_test_case_custom_fields");
    expect(toolNames).toContain("bulk_set_test_case_custom_fields");
    expect(toolNames).toContain("delete_custom_field_value");
    expect(toolNames).toContain("rename_custom_field_value");
    expect(toolNames).toContain("merge_custom_field_values");
    expect(toolNames).toContain("search_test_cases_by_missing_field");

    expectRequiredFields(bundle.tools, "delete_custom_field_value", ["valueId"]);
    expectRequiredFields(bundle.tools, "rename_custom_field_value", ["valueId", "name"]);
    expectRequiredFields(bundle.tools, "bulk_set_test_case_custom_fields", ["payload"]);
    expectRequiredFields(bundle.tools, "merge_custom_field_values", [
      "customFieldId",
      "sourceValueId",
      "targetValueId",
    ]);
    expectRequiredFields(bundle.tools, "search_test_cases_by_missing_field", ["fieldName"]);
  });
});
