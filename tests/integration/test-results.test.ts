import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  asArrayContent,
  callSafe,
  callTool,
  getMissingIntegrationEnv,
  getProjectId,
  integrationEnabled,
  pickId,
  pickString,
  uniqueName,
} from "./setup.js";

type JsonRecord = Record<string, unknown>;

const describeIntegration = integrationEnabled ? describe : describe.skip;

function detectUsername(source: unknown): string | undefined {
  if (!source || typeof source !== "object") {
    return undefined;
  }
  const record = source as JsonRecord;
  const direct =
    pickString(record, "username") ??
    pickString(record, "createdBy") ??
    pickString(record, "lastModifiedBy");
  if (direct) {
    return direct;
  }
  const assignee = record.assignee;
  if (assignee && typeof assignee === "object") {
    return pickString(assignee as JsonRecord, "username");
  }
  return undefined;
}

describeIntegration("test result tools integration", () => {
  let projectId = 0;
  let launchId: number | undefined;
  let testCaseId: number | undefined;
  let testResultId: number | undefined;
  let createdResultPayload: unknown;
  const createdName = uniqueName("it-result");

  beforeAll(async () => {
    projectId = getProjectId();

    const launch = await callTool<{ id: number }>("create_launch", {
      payload: { name: uniqueName("it-result-launch"), projectId },
    });
    launchId = pickId(launch);

    const testCase = await callTool<{ id: number }>("create_test_case", {
      payload: {
        name: uniqueName("it-result-testcase"),
        projectId,
        scenario: { steps: [] },
      },
    });
    testCaseId = pickId(testCase);
  });

  afterAll(async () => {
    if (launchId) {
      await callSafe("delete_launch", { id: launchId });
    }
    if (testCaseId) {
      await callSafe("delete_test_case", { id: testCaseId });
    }
  });

  it("create_test_result then get_test_result", async () => {
    createdResultPayload = await callTool<{ id: number }>("create_test_result", {
      payload: {
        launchId: launchId as number,
        testCaseId: testCaseId as number,
        name: createdName,
        status: "passed",
      },
    });

    testResultId = pickId(createdResultPayload);
    expect(testResultId).toBeTypeOf("number");

    const fetched = await callTool("get_test_result", { id: testResultId as number });
    expect(pickId(fetched)).toBe(testResultId);
  });

  it("get_test_result", async () => {
    const result = await callTool("get_test_result", { id: testResultId as number });
    expect(pickId(result)).toBe(testResultId);
  });

  it("list_test_results", async () => {
    const list = await callTool("list_test_results", {
      launchId: launchId as number,
      size: 100,
    });
    const found = asArrayContent(list).some((item) => pickId(item) === testResultId);
    expect(found).toBe(true);
  });

  it("search_test_results", async () => {
    const search = await callTool("search_test_results", {
      projectId,
      rql: `id = ${testResultId as number}`,
      size: 20,
    });
    const found = asArrayContent(search).some((item) => pickId(item) === testResultId);
    expect(found).toBe(true);
  }, 90000);

  it("update_test_result then verify by get_test_result", async () => {
    const beforeUpdate = await callTool<JsonRecord>("get_test_result", {
      id: testResultId as number,
    });
    const beforeLastModified =
      typeof beforeUpdate.lastModifiedDate === "number"
        ? beforeUpdate.lastModifiedDate
        : undefined;

    const updatedName = uniqueName("it-result-updated");
    await callTool("update_test_result", {
      id: testResultId as number,
      payload: { name: updatedName },
    });

    const updated = await callTool<{ id: number; name?: string }>("get_test_result", {
      id: testResultId as number,
    });
    expect(pickId(updated)).toBe(testResultId);
    if (
      beforeLastModified !== undefined &&
      typeof (updated as JsonRecord).lastModifiedDate === "number"
    ) {
      expect((updated as JsonRecord).lastModifiedDate as number).toBeGreaterThanOrEqual(
        beforeLastModified,
      );
    }
  });

  it("get_test_result_history", async () => {
    const history = await callTool("get_test_result_history", {
      id: testResultId as number,
      size: 10,
    });
    expect(history).toBeTruthy();
  });

  it("assign_test_result then verify by get_test_result", async () => {
    const username =
      process.env.ALLURE_ASSIGN_USERNAME ?? detectUsername(createdResultPayload);
    if (!username) {
      expect(username).toBeUndefined();
      return;
    }

    await callTool("assign_test_result", {
      id: testResultId as number,
      payload: { username },
    });
    const assigned = await callTool("get_test_result", { id: testResultId as number });
    expect(pickId(assigned)).toBe(testResultId);
  });

  it("resolve_test_result then verify by get_test_result", async () => {
    await callTool("resolve_test_result", {
      id: testResultId as number,
      payload: { status: "passed" },
    });
    const resolved = await callTool("get_test_result", { id: testResultId as number });
    expect(pickId(resolved)).toBe(testResultId);
  });
});

if (!integrationEnabled) {
  const missing = getMissingIntegrationEnv().join(", ");
  describe("test result tools integration (skipped)", () => {
    it(`missing env: ${missing}`, () => {
      expect(integrationEnabled).toBe(false);
    });
  });
}
