import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestPlanTools } from "../../../src/tools/test-plans.js";
import * as api from "../../../src/api/test-plans.js";
import {
  createMockClient,
  expectObjectSchemas,
  expectRequiredFields,
  expectSchemaProperty,
  expectToolHandlerParity,
} from "../tool-test-helpers.js";

vi.mock("../../../src/api/test-plans.js", () => ({
  listTestPlans: vi.fn(),
  getTestPlan: vi.fn(),
  createTestPlan: vi.fn(),
  updateTestPlan: vi.fn(),
  deleteTestPlan: vi.fn(),
  runTestPlan: vi.fn(),
}));

describe("createTestPlanTools", () => {
  const client = createMockClient();
  const defaultProjectId = 15;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defines tool schemas and handlers for every test plan tool", () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    expectToolHandlerParity(bundle);
    expectObjectSchemas(bundle);
  });

  it("has expected required fields in critical tool schemas", () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);

    expectRequiredFields(bundle.tools, "get_test_plan", ["id"]);
    expectRequiredFields(bundle.tools, "create_test_plan", ["payload"]);
    expectRequiredFields(bundle.tools, "update_test_plan", ["id", "payload"]);
    expectRequiredFields(bundle.tools, "delete_test_plan", ["id"]);
    expectRequiredFields(bundle.tools, "run_test_plan", ["id"]);
    expectSchemaProperty(bundle.tools, "list_test_plans", "projectId");
    expectSchemaProperty(bundle.tools, "list_test_plans", "projectName");
  });

  it("list_test_plans forwards pagination and default projectId", async () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    vi.mocked(api.listTestPlans).mockResolvedValueOnce([{ id: 1 }]);

    const result = await bundle.handlers.list_test_plans({ search: "smoke", page: 1, size: 20 });

    expect(api.listTestPlans).toHaveBeenCalledWith(client, defaultProjectId, {
      search: "smoke",
      page: 1,
      size: 20,
      sort: undefined,
    });
    expect(result).toEqual([{ id: 1 }]);
  });

  it("get_test_plan validates id", async () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    await expect(bundle.handlers.get_test_plan({})).rejects.toThrow('"id" must be a number.');
  });

  it("create_test_plan injects default projectId", async () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    vi.mocked(api.createTestPlan).mockResolvedValueOnce({ id: 2 });

    await bundle.handlers.create_test_plan({ payload: { name: "regression" } });

    expect(api.createTestPlan).toHaveBeenCalledWith(client, {
      name: "regression",
      projectId: defaultProjectId,
    });
  });

  it("update_test_plan requires payload object", async () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    await expect(bundle.handlers.update_test_plan({ id: 4, payload: "bad" })).rejects.toThrow(
      '"payload" must be an object.',
    );
  });

  it("delete_test_plan forwards id", async () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    vi.mocked(api.deleteTestPlan).mockResolvedValueOnce(undefined);

    await bundle.handlers.delete_test_plan({ id: 7 });

    expect(api.deleteTestPlan).toHaveBeenCalledWith(client, 7);
  });

  it("run_test_plan accepts undefined payload and validates object when provided", async () => {
    const bundle = createTestPlanTools(client as never, defaultProjectId);
    vi.mocked(api.runTestPlan).mockResolvedValueOnce({ ok: true });

    await bundle.handlers.run_test_plan({ id: 10 });
    expect(api.runTestPlan).toHaveBeenCalledWith(client, 10, undefined);

    await expect(bundle.handlers.run_test_plan({ id: 10, payload: [] })).rejects.toThrow(
      '"payload" must be an object when provided.',
    );
  });
});
