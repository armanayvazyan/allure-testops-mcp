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
}));

describe("createTestCaseTools", () => {
  const client = createMockClient();
  const defaultProjectId = 101;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defines tool schemas and handlers for every test case tool", () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);
    expectToolHandlerParity(bundle);
    expectObjectSchemas(bundle);
  });

  it("has expected required fields and schema properties", () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);

    expectRequiredFields(bundle.tools, "search_test_cases", ["rql"]);
    expectRequiredFields(bundle.tools, "get_test_case", ["id"]);
    expectRequiredFields(bundle.tools, "create_test_case", ["payload"]);
    expectRequiredFields(bundle.tools, "update_test_case", ["id", "payload"]);
    expectRequiredFields(bundle.tools, "set_test_case_tags", ["testCaseId", "payload"]);
    expectRequiredFields(bundle.tools, "set_test_case_issues", ["testCaseId", "payload"]);
    expectRequiredFields(bundle.tools, "set_test_case_custom_fields", ["testCaseId", "payload"]);
    expectSchemaProperty(bundle.tools, "list_test_cases", "projectId");
    expectSchemaProperty(bundle.tools, "list_test_cases", "projectName");
    expectSchemaProperty(bundle.tools, "list_custom_field_values", "customFieldId");
  });

  it("list and search handlers resolve project id and forward pagination", async () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);
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
    const bundle = createTestCaseTools(client as never, defaultProjectId);
    await expect(bundle.handlers.search_test_cases({})).rejects.toThrow(
      '"rql" must be a non-empty string.',
    );
  });

  it("create and update handlers validate payload object", async () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);
    await expect(bundle.handlers.create_test_case({ payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
    await expect(bundle.handlers.update_test_case({ id: 4, payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
  });

  it("create_test_case injects default project id into payload", async () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);
    vi.mocked(api.createTestCase).mockResolvedValueOnce({ id: 3 });

    await bundle.handlers.create_test_case({ payload: { name: "A" } });

    expect(api.createTestCase).toHaveBeenCalledWith(client, { name: "A", projectId: defaultProjectId });
  });

  it("id-based get/update/delete/restore handlers call API", async () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);
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
    const bundle = createTestCaseTools(client as never, defaultProjectId);
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
    const bundle = createTestCaseTools(client as never, defaultProjectId);
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

  it("custom-field handlers resolve project id and validate required customFieldId", async () => {
    const bundle = createTestCaseTools(client as never, defaultProjectId);
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
});
