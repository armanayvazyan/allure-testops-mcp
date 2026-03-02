import { describe, expect, it, vi } from "vitest";
import {
  asObject,
  ensureProjectIdInPayload,
  getObjectPayload,
  getOptionalBoolean,
  getOptionalNumber,
  getOptionalObjectPayload,
  getOptionalString,
  getOptionalStringArray,
  getRequiredId,
  getRequiredNumber,
  getRequiredString,
  pickPagination,
  resolveProjectId,
} from "../../../src/tools/utils.js";

describe("tool utils", () => {
  it("asObject returns empty object for invalid raw args", () => {
    expect(asObject(undefined)).toEqual({});
    expect(asObject(null)).toEqual({});
    expect(asObject([])).toEqual({});
    expect(asObject("x")).toEqual({});
    expect(asObject({ id: 1 })).toEqual({ id: 1 });
  });

  it("getRequiredNumber validates presence and numeric value", () => {
    expect(getRequiredNumber({ id: 5 }, "id")).toBe(5);
    expect(() => getRequiredNumber({}, "id")).toThrow('"id" must be a number.');
    expect(() => getRequiredNumber({ id: "5" }, "id")).toThrow('"id" must be a number.');
    expect(() => getRequiredNumber({ id: Number.NaN }, "id")).toThrow('"id" must be a number.');
  });

  it("getOptionalNumber validates type when provided", () => {
    expect(getOptionalNumber({}, "size")).toBeUndefined();
    expect(getOptionalNumber({ size: 10 }, "size")).toBe(10);
    expect(() => getOptionalNumber({ size: "10" }, "size")).toThrow(
      '"size" must be a number when provided.',
    );
  });

  it("getRequiredString validates non-empty string", () => {
    expect(getRequiredString({ rql: "status = failed" }, "rql")).toBe("status = failed");
    expect(() => getRequiredString({}, "rql")).toThrow('"rql" must be a non-empty string.');
    expect(() => getRequiredString({ rql: "" }, "rql")).toThrow('"rql" must be a non-empty string.');
  });

  it("optional string, boolean and string-array validators handle happy and invalid paths", () => {
    expect(getOptionalString({}, "search")).toBeUndefined();
    expect(getOptionalString({ search: "api" }, "search")).toBe("api");
    expect(() => getOptionalString({ search: 1 }, "search")).toThrow(
      '"search" must be a string when provided.',
    );

    expect(getOptionalBoolean({}, "global")).toBeUndefined();
    expect(getOptionalBoolean({ global: true }, "global")).toBe(true);
    expect(() => getOptionalBoolean({ global: "yes" }, "global")).toThrow(
      '"global" must be a boolean when provided.',
    );

    expect(getOptionalStringArray({}, "sort")).toBeUndefined();
    expect(getOptionalStringArray({ sort: ["name,asc"] }, "sort")).toEqual(["name,asc"]);
    expect(() => getOptionalStringArray({ sort: [1] }, "sort")).toThrow(
      '"sort" must be an array of strings when provided.',
    );
  });

  it("getRequiredId delegates to numeric validation", () => {
    expect(getRequiredId({ id: 42 })).toBe(42);
    expect(() => getRequiredId({})).toThrow('"id" must be a number.');
    expect(getRequiredId({ testCaseId: 22 }, "testCaseId")).toBe(22);
  });

  it("object payload validators enforce object shape", () => {
    expect(getObjectPayload({ payload: { id: 1 } })).toEqual({ id: 1 });
    expect(() => getObjectPayload({ payload: [] })).toThrow('"payload" must be an object.');
    expect(() => getObjectPayload({})).toThrow('"payload" must be an object.');

    expect(getOptionalObjectPayload({}, "payload")).toBeUndefined();
    expect(getOptionalObjectPayload({ payload: { x: 1 } }, "payload")).toEqual({ x: 1 });
    expect(() => getOptionalObjectPayload({ payload: [] }, "payload")).toThrow(
      '"payload" must be an object when provided.',
    );
  });

  it("ensureProjectIdInPayload only injects projectId when missing and default exists", () => {
    expect(ensureProjectIdInPayload({ name: "x" }, 9)).toEqual({ name: "x", projectId: 9 });
    expect(ensureProjectIdInPayload({ projectId: 11 }, 9)).toEqual({ projectId: 11 });
    expect(ensureProjectIdInPayload({ name: "x" }, undefined)).toEqual({ name: "x" });
  });

  it("pickPagination maps typed pagination fields", () => {
    expect(pickPagination({ page: 1, size: 20, sort: ["id,asc"] })).toEqual({
      page: 1,
      size: 20,
      sort: ["id,asc"],
    });
    expect(pickPagination({})).toEqual({
      page: undefined,
      size: undefined,
      sort: undefined,
    });
  });

  it("resolveProjectId prefers explicit projectId", async () => {
    const client = { get: vi.fn() };
    const result = await resolveProjectId({ projectId: 77 }, client as never, 99);
    expect(result).toBe(77);
    expect(client.get).not.toHaveBeenCalled();
  });

  it("resolveProjectId resolves exact projectName through suggest endpoint", async () => {
    const client = {
      get: vi.fn().mockResolvedValue({
        content: [
          { id: 1, name: "Other" },
          { id: 25, name: "Demo Project" },
        ],
      }),
    };
    const result = await resolveProjectId({ projectName: "demo project" }, client as never, 99);
    expect(result).toBe(25);
    expect(client.get).toHaveBeenCalledWith("/api/project/suggest", { query: "demo project" });
  });

  it("resolveProjectId rejects empty projectName", async () => {
    const client = { get: vi.fn() };
    await expect(
      resolveProjectId({ projectName: "  " }, client as never, undefined),
    ).rejects.toThrow('"projectName" must be a non-empty string when provided.');
  });

  it("resolveProjectId rejects unknown projectName", async () => {
    const client = { get: vi.fn().mockResolvedValue({ content: [{ id: 1, name: "X" }] }) };
    await expect(
      resolveProjectId({ projectName: "Y" }, client as never, undefined),
    ).rejects.toThrow(
      'Project "Y" not found. Pass "projectId" explicitly or use an exact project name.',
    );
  });

  it("resolveProjectId falls back to default project id and then errors when unavailable", async () => {
    const client = { get: vi.fn() };
    await expect(resolveProjectId({}, client as never, 55)).resolves.toBe(55);
    await expect(resolveProjectId({}, client as never, undefined)).rejects.toThrow(
      'Project scope is required. Pass "projectId" or "projectName", or set ALLURE_PROJECT_ID in env.',
    );
  });
});
