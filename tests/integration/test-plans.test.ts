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

describeIntegration("test plan tools integration", () => {
  let projectId = 0;
  let testPlanId: number | undefined;
  const createdName = uniqueName("it-plan");

  beforeAll(() => {
    projectId = getProjectId();
  });

  afterAll(async () => {
    if (testPlanId) {
      await callSafe("delete_test_plan", { id: testPlanId });
    }
  });

  it("create_test_plan then get_test_plan", async () => {
    const created = await callTool<{ id: number }>("create_test_plan", {
      payload: { name: createdName, projectId },
    });
    testPlanId = pickId(created);
    expect(testPlanId).toBeTypeOf("number");

    const fetched = await callTool<{ id: number }>("get_test_plan", {
      id: testPlanId as number,
    });
    expect(pickId(fetched)).toBe(testPlanId);
  });

  it("get_test_plan", async () => {
    const plan = await callTool("get_test_plan", { id: testPlanId as number });
    expect(pickId(plan)).toBe(testPlanId);
  });

  it("list_test_plans", async () => {
    const list = await callTool("list_test_plans", { projectId, size: 100 });
    const found = asArrayContent(list).some((item) => pickId(item) === testPlanId);
    expect(found).toBe(true);
  });

  it("update_test_plan then verify by get_test_plan", async () => {
    const updatedName = uniqueName("it-plan-updated");
    await callTool("update_test_plan", {
      id: testPlanId as number,
      payload: { name: updatedName },
    });

    const updated = await callTool<{ id: number; name?: string }>("get_test_plan", {
      id: testPlanId as number,
    });
    expect(pickId(updated)).toBe(testPlanId);
    if (typeof updated.name === "string") {
      expect(updated.name).toBe(updatedName);
    }
  });

  it("run_test_plan then verify plan remains accessible", async () => {
    const runResult = await callTool("run_test_plan", {
      id: testPlanId as number,
      payload: { launchName: uniqueName("it-run-launch") },
    });
    expect(runResult).toBeDefined();

    const fetched = await callTool("get_test_plan", { id: testPlanId as number });
    expect(pickId(fetched)).toBe(testPlanId);
  });

  it("delete_test_plan then verify missing by get_test_plan", async () => {
    const deletedId = testPlanId as number;
    await callTool("delete_test_plan", { id: deletedId });
    testPlanId = undefined;

    await expect(callTool("get_test_plan", { id: deletedId })).rejects.toThrow();
  });
});

if (!integrationEnabled) {
  const missing = getMissingIntegrationEnv().join(", ");
  describe("test plan tools integration (skipped)", () => {
    it(`missing env: ${missing}`, () => {
      expect(integrationEnabled).toBe(false);
    });
  });
}
