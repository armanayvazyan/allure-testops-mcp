import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  asArrayContent,
  callSafe,
  callTool,
  getMissingIntegrationEnv,
  getProjectId,
  integrationEnabled,
  pickId,
  uniqueName,
} from "./setup.js";

const describeIntegration = integrationEnabled ? describe : describe.skip;

describeIntegration("launch tools integration", () => {
  let projectId = 0;
  let launchId: number | undefined;
  let testCaseId: number | undefined;
  let testPlanId: number | undefined;
  const createdLaunchName = uniqueName("it-launch");

  beforeAll(async () => {
    projectId = getProjectId();

    const createdTestCase = await callTool<{ id: number }>("create_test_case", {
      payload: {
        name: uniqueName("it-launch-testcase"),
        projectId,
        scenario: { steps: [] },
      },
    });
    testCaseId = pickId(createdTestCase);

    const createdTestPlan = await callTool<{ id: number }>("create_test_plan", {
      payload: {
        name: uniqueName("it-launch-plan"),
        projectId,
      },
    });
    testPlanId = pickId(createdTestPlan);
  });

  afterAll(async () => {
    if (launchId) {
      await callSafe("delete_launch", { id: launchId });
    }
    if (testCaseId) {
      await callSafe("delete_test_case", { id: testCaseId });
    }
    if (testPlanId) {
      await callSafe("delete_test_plan", { id: testPlanId });
    }
  });

  it("create_launch then get_launch", async () => {
    const created = await callTool<{ id: number; name?: string }>("create_launch", {
      payload: { name: createdLaunchName, projectId },
    });

    launchId = pickId(created);
    expect(launchId).toBeTypeOf("number");

    const fetched = await callTool<{ id: number; name?: string }>("get_launch", {
      id: launchId as number,
    });
    expect(pickId(fetched)).toBe(launchId);
    expect(typeof fetched).toBe("object");
  });

  it("get_launch", async () => {
    expect(launchId).toBeTypeOf("number");
    const launch = await callTool<{ id: number }>("get_launch", { id: launchId as number });
    expect(pickId(launch)).toBe(launchId);
  });

  it("list_launches", async () => {
    const list = await callTool("list_launches", { projectId, size: 100 });
    const content = asArrayContent(list);
    const found = content.some((item) => pickId(item) === launchId);
    expect(found).toBe(true);
  });

  it("search_launches", async () => {
    const search = await callTool("search_launches", {
      projectId,
      rql: `name = "${createdLaunchName}"`,
      size: 20,
    });
    const content = asArrayContent(search);
    const found = content.some((item) => pickId(item) === launchId);
    expect(found).toBe(true);
  });

  it("update_launch then verify by get_launch", async () => {
    const updatedName = uniqueName("it-launch-updated");
    await callTool("update_launch", {
      id: launchId as number,
      payload: { name: updatedName },
    });

    const updated = await callTool<{ id: number; name?: string }>("get_launch", {
      id: launchId as number,
    });
    expect(pickId(updated)).toBe(launchId);
    if (typeof updated.name === "string") {
      expect(updated.name).toBe(updatedName);
    }
  });

  it("get_launch_statistic", async () => {
    const stats = await callTool("get_launch_statistic", { id: launchId as number });
    expect(stats).toBeTruthy();
  });

  it("get_launch_progress", async () => {
    const progress = await callTool("get_launch_progress", { id: launchId as number });
    expect(progress).toBeTruthy();
  });

  it("add_test_cases_to_launch then verify by get_launch", async () => {
    expect(testCaseId).toBeTypeOf("number");

    await callTool("add_test_cases_to_launch", {
      id: launchId as number,
      payload: {
        selection: {
          projectId,
          leafsInclude: [testCaseId as number],
          inverted: false,
        },
      },
    });

    const launch = await callTool("get_launch", { id: launchId as number });
    expect(pickId(launch)).toBe(launchId);
  });

  it("add_test_plan_to_launch then verify by get_launch", async () => {
    expect(testPlanId).toBeTypeOf("number");

    await callTool("add_test_plan_to_launch", {
      id: launchId as number,
      payload: { testPlanId: testPlanId as number },
    });

    const launch = await callTool("get_launch", { id: launchId as number });
    expect(pickId(launch)).toBe(launchId);
  });

  it("close_launch then verify by get_launch", async () => {
    await callTool("close_launch", { id: launchId as number });
    const closed = await callTool("get_launch", { id: launchId as number });
    expect(pickId(closed)).toBe(launchId);
  });

  it("reopen_launch then verify by get_launch", async () => {
    await callTool("reopen_launch", { id: launchId as number });
    const reopened = await callTool("get_launch", { id: launchId as number });
    expect(pickId(reopened)).toBe(launchId);
  });

  it("delete_launch then verify by list_launches", async () => {
    await callTool("delete_launch", { id: launchId as number });
    const deletedId = launchId;
    launchId = undefined;

    const list = await callTool("list_launches", { projectId, size: 100 });
    const found = asArrayContent(list).some((item) => pickId(item) === deletedId);
    expect(found).toBe(false);
  });
});

if (!integrationEnabled) {
  const missing = getMissingIntegrationEnv().join(", ");
  describe("launch tools integration (skipped)", () => {
    it(`missing env: ${missing}`, () => {
      expect(integrationEnabled).toBe(false);
    });
  });
}
