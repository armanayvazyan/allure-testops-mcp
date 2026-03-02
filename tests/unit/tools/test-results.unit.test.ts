import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestResultTools } from "../../../src/tools/test-results.js";
import * as api from "../../../src/api/test-results.js";
import {
  createMockClient,
  expectObjectSchemas,
  expectRequiredFields,
  expectSchemaProperty,
  expectToolHandlerParity,
} from "../tool-test-helpers.js";

vi.mock("../../../src/api/test-results.js", () => ({
  listTestResults: vi.fn(),
  searchTestResults: vi.fn(),
  getTestResult: vi.fn(),
  createTestResult: vi.fn(),
  updateTestResult: vi.fn(),
  getTestResultHistory: vi.fn(),
  assignTestResult: vi.fn(),
  resolveTestResult: vi.fn(),
}));

describe("createTestResultTools", () => {
  const client = createMockClient();
  const defaultProjectId = 88;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defines tool schemas and handlers for every test result tool", () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);
    expectToolHandlerParity(bundle);
    expectObjectSchemas(bundle);
  });

  it("has expected required fields in critical tool schemas", () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);

    expectRequiredFields(bundle.tools, "list_test_results", ["launchId"]);
    expectRequiredFields(bundle.tools, "search_test_results", ["rql"]);
    expectRequiredFields(bundle.tools, "create_test_result", ["payload"]);
    expectRequiredFields(bundle.tools, "update_test_result", ["id", "payload"]);
    expectRequiredFields(bundle.tools, "assign_test_result", ["id", "payload"]);
    expectRequiredFields(bundle.tools, "resolve_test_result", ["id", "payload"]);
    expectSchemaProperty(bundle.tools, "search_test_results", "projectId");
    expectSchemaProperty(bundle.tools, "search_test_results", "projectName");
  });

  it("list_test_results validates launchId and forwards pagination", async () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);
    vi.mocked(api.listTestResults).mockResolvedValueOnce([{ id: 1 }]);

    const result = await bundle.handlers.list_test_results({
      launchId: 12,
      search: "failed",
      page: 2,
      size: 15,
    });

    expect(api.listTestResults).toHaveBeenCalledWith(client, 12, {
      search: "failed",
      filterId: undefined,
      page: 2,
      size: 15,
      sort: undefined,
    });
    expect(result).toEqual([{ id: 1 }]);
  });

  it("search_test_results requires rql", async () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);
    await expect(bundle.handlers.search_test_results({ projectId: 1 })).rejects.toThrow(
      '"rql" must be a non-empty string.',
    );
  });

  it("search_test_results resolves project from default project id", async () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);
    vi.mocked(api.searchTestResults).mockResolvedValueOnce([]);

    await bundle.handlers.search_test_results({ rql: "status = failed" });

    expect(api.searchTestResults).toHaveBeenCalledWith(client, defaultProjectId, "status = failed", {
      page: undefined,
      size: undefined,
      sort: undefined,
    });
  });

  it("get/create/update handlers validate required fields", async () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);

    await expect(bundle.handlers.get_test_result({})).rejects.toThrow('"id" must be a number.');
    await expect(bundle.handlers.create_test_result({ payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
    await expect(bundle.handlers.update_test_result({ id: 1, payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
  });

  it("history, assign and resolve handlers call API with expected args", async () => {
    const bundle = createTestResultTools(client as never, defaultProjectId);
    vi.mocked(api.getTestResultHistory).mockResolvedValueOnce([]);
    vi.mocked(api.assignTestResult).mockResolvedValueOnce({ ok: true });
    vi.mocked(api.resolveTestResult).mockResolvedValueOnce({ ok: true });

    await bundle.handlers.get_test_result_history({ id: 9, size: 5 });
    await bundle.handlers.assign_test_result({ id: 10, payload: { username: "alice" } });
    await bundle.handlers.resolve_test_result({ id: 11, payload: { status: "MUTED" } });

    expect(api.getTestResultHistory).toHaveBeenCalledWith(client, 9, {
      page: undefined,
      size: 5,
      sort: undefined,
    });
    expect(api.assignTestResult).toHaveBeenCalledWith(client, 10, { username: "alice" });
    expect(api.resolveTestResult).toHaveBeenCalledWith(client, 11, { status: "MUTED" });
  });
});
