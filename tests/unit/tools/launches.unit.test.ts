import { beforeEach, describe, expect, it, vi } from "vitest";
import { createLaunchTools } from "../../../src/tools/launches.js";
import * as api from "../../../src/api/launches.js";
import {
  createMockClient,
  expectObjectSchemas,
  expectRequiredFields,
  expectSchemaProperty,
  expectToolHandlerParity,
} from "../tool-test-helpers.js";

vi.mock("../../../src/api/launches.js", () => ({
  listLaunches: vi.fn(),
  searchLaunches: vi.fn(),
  getLaunch: vi.fn(),
  createLaunch: vi.fn(),
  updateLaunch: vi.fn(),
  deleteLaunch: vi.fn(),
  closeLaunch: vi.fn(),
  reopenLaunch: vi.fn(),
  getLaunchStatistic: vi.fn(),
  getLaunchProgress: vi.fn(),
  addTestCasesToLaunch: vi.fn(),
  addTestPlanToLaunch: vi.fn(),
}));

describe("createLaunchTools", () => {
  const defaultProjectId = 77;
  const client = createMockClient(defaultProjectId);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("defines tool schemas and handlers for every launch tool", () => {
    const bundle = createLaunchTools(client as never);
    expectToolHandlerParity(bundle);
    expectObjectSchemas(bundle);
  });

  it("has expected required fields in critical tool schemas", () => {
    const bundle = createLaunchTools(client as never);

    expectRequiredFields(bundle.tools, "search_launches", ["rql"]);
    expectRequiredFields(bundle.tools, "create_launch", ["payload"]);
    expectRequiredFields(bundle.tools, "update_launch", ["id", "payload"]);
    expectRequiredFields(bundle.tools, "add_test_cases_to_launch", ["id", "payload"]);
    expectSchemaProperty(bundle.tools, "list_launches", "projectId");
    expectSchemaProperty(bundle.tools, "list_launches", "projectName");
  });

  it("list_launches validates and calls api with resolved project", async () => {
    const bundle = createLaunchTools(client as never);
    (api.listLaunches as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(["ok"]);

    const result = await bundle.handlers.list_launches({ page: 2, size: 5, sort: ["name,asc"] });

    expect(api.listLaunches).toHaveBeenCalledWith(client, defaultProjectId, {
      search: undefined,
      filterId: undefined,
      page: 2,
      size: 5,
      sort: ["name,asc"],
    });
    expect(result).toEqual(["ok"]);
  });

  it("search_launches requires rql", async () => {
    const bundle = createLaunchTools(client as never);
    await expect(bundle.handlers.search_launches({})).rejects.toThrow(
      '"rql" must be a non-empty string.',
    );
  });

  it("get_launch requires numeric id", async () => {
    const bundle = createLaunchTools(client as never);
    await expect(bundle.handlers.get_launch({ id: "1" })).rejects.toThrow('"id" must be a number.');
  });

  it("create_launch injects default projectId into payload", async () => {
    const bundle = createLaunchTools(client as never);
    (api.createLaunch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ id: 11 });

    await bundle.handlers.create_launch({ payload: { name: "run-1" } });

    expect(api.createLaunch).toHaveBeenCalledWith(client, {
      name: "run-1",
      projectId: defaultProjectId,
    });
  });

  it("update_launch requires payload object", async () => {
    const bundle = createLaunchTools(client as never);
    await expect(bundle.handlers.update_launch({ id: 1, payload: [] })).rejects.toThrow(
      '"payload" must be an object.',
    );
  });

  it("forwards id-based handlers to API", async () => {
    const bundle = createLaunchTools(client as never);
    (api.deleteLaunch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
    (api.closeLaunch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
    (api.reopenLaunch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(undefined);
    (api.getLaunchStatistic as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});
    (api.getLaunchProgress as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

    await bundle.handlers.delete_launch({ id: 2 });
    await bundle.handlers.close_launch({ id: 3 });
    await bundle.handlers.reopen_launch({ id: 4 });
    await bundle.handlers.get_launch_statistic({ id: 5 });
    await bundle.handlers.get_launch_progress({ id: 6 });

    expect(api.deleteLaunch).toHaveBeenCalledWith(client, 2);
    expect(api.closeLaunch).toHaveBeenCalledWith(client, 3);
    expect(api.reopenLaunch).toHaveBeenCalledWith(client, 4);
    expect(api.getLaunchStatistic).toHaveBeenCalledWith(client, 5);
    expect(api.getLaunchProgress).toHaveBeenCalledWith(client, 6);
  });

  it("add_test_cases_to_launch and add_test_plan_to_launch require object payload", async () => {
    const bundle = createLaunchTools(client as never);
    await expect(bundle.handlers.add_test_cases_to_launch({ id: 1, payload: null })).rejects.toThrow(
      '"payload" must be an object.',
    );
    await expect(bundle.handlers.add_test_plan_to_launch({ id: 1, payload: null })).rejects.toThrow(
      '"payload" must be an object.',
    );
  });
});
