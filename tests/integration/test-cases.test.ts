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

type JsonRecord = Record<string, unknown>;

const describeIntegration = integrationEnabled ? describe : describe.skip;

function toCustomFieldUpdatePayload(raw: unknown): JsonRecord[] {
  const entries = asArrayContent(raw);
  return entries
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }
      const entry = item as JsonRecord;
      const customField = entry.customField;
      if (!customField || typeof customField !== "object") {
        return undefined;
      }
      const customFieldId = pickId(customField);
      if (!customFieldId) {
        return undefined;
      }
      const values = asArrayContent(entry.values)
        .map((value) => {
          if (!value || typeof value !== "object") {
            return undefined;
          }
          const row = value as JsonRecord;
          const id = typeof row.id === "number" ? row.id : undefined;
          const name = typeof row.name === "string" ? row.name : undefined;
          if (id === undefined && name === undefined) {
            return undefined;
          }
          return { ...(id !== undefined ? { id } : {}), ...(name ? { name } : {}) };
        })
        .filter((x): x is JsonRecord => x !== undefined);

      return {
        customField: { id: customFieldId },
        values,
      };
    })
    .filter((x): x is JsonRecord => x !== undefined);
}

describeIntegration("test case tools integration", () => {
  let projectId = 0;
  let testCaseId: number | undefined;
  let customFieldId: number | undefined;
  const createdName = uniqueName("it-testcase");

  beforeAll(() => {
    projectId = getProjectId();
  });

  afterAll(async () => {
    if (testCaseId) {
      await callSafe("delete_test_case", { id: testCaseId });
    }
  });

  it("create_test_case then get_test_case", async () => {
    const created = await callTool<{ id: number }>("create_test_case", {
      payload: {
        name: createdName,
        projectId,
        scenario: { steps: [] },
      },
    });
    testCaseId = pickId(created);
    expect(testCaseId).toBeTypeOf("number");

    const fetched = await callTool<{ id: number }>("get_test_case", { id: testCaseId as number });
    expect(pickId(fetched)).toBe(testCaseId);
  });

  it("get_test_case", async () => {
    const testCase = await callTool<{ id: number }>("get_test_case", { id: testCaseId as number });
    expect(pickId(testCase)).toBe(testCaseId);
  });

  it("list_test_cases", async () => {
    const list = await callTool("list_test_cases", { projectId, size: 100 });
    const found = asArrayContent(list).some((item) => pickId(item) === testCaseId);
    expect(found).toBe(true);
  });

  it("search_test_cases", async () => {
    const result = await callTool("search_test_cases", {
      projectId,
      rql: `name = "${createdName}"`,
      size: 20,
    });
    const found = asArrayContent(result).some((item) => pickId(item) === testCaseId);
    expect(found).toBe(true);
  });

  it("update_test_case then verify by get_test_case", async () => {
    const updatedName = uniqueName("it-testcase-updated");
    await callTool("update_test_case", {
      id: testCaseId as number,
      payload: { name: updatedName },
    });
    const updated = await callTool<{ id: number; name?: string }>("get_test_case", {
      id: testCaseId as number,
    });
    expect(pickId(updated)).toBe(testCaseId);
    if (typeof updated.name === "string") {
      expect(updated.name).toBe(updatedName);
    }
  });

  it("get_test_case_overview", async () => {
    const overview = await callTool("get_test_case_overview", {
      testCaseId: testCaseId as number,
    });
    expect(overview).toBeTruthy();
  });

  it("get_test_case_history", async () => {
    const history = await callTool("get_test_case_history", {
      id: testCaseId as number,
      size: 10,
    });
    expect(history).toBeTruthy();
  });

  it("get_test_case_scenario", async () => {
    const scenario = await callTool("get_test_case_scenario", { id: testCaseId as number });
    expect(scenario).toBeTruthy();
  });

  it("set_test_case_tags then get_test_case_tags", async () => {
    await callTool("set_test_case_tags", {
      testCaseId: testCaseId as number,
      payload: [],
    });
    const tags = await callTool("get_test_case_tags", {
      testCaseId: testCaseId as number,
    });
    expect(tags).toBeDefined();
  });

  it("set_test_case_issues then get_test_case_issues", async () => {
    await callTool("set_test_case_issues", {
      testCaseId: testCaseId as number,
      payload: [],
    });
    const issues = await callTool("get_test_case_issues", {
      testCaseId: testCaseId as number,
    });
    expect(issues).toBeDefined();
  });

  it("list_project_custom_fields", async () => {
    const response = await callTool("list_project_custom_fields", {
      projectId,
      size: 100,
    });
    const first = asArrayContent(response)[0];
    customFieldId = pickId(first);
    expect(response).toBeTruthy();
  });

  it("list_custom_field_values", async () => {
    if (!customFieldId) {
      // Some projects can have no custom fields configured.
      expect(customFieldId).toBeUndefined();
      return;
    }
    const values = await callTool("list_custom_field_values", {
      projectId,
      customFieldId,
      size: 5,
    });
    expect(values).toBeDefined();
  }, 90000);

  it("get_test_case_custom_fields", async () => {
    const values = await callTool("get_test_case_custom_fields", {
      testCaseId: testCaseId as number,
      projectId,
    });
    expect(values).toBeDefined();
  });

  it("set_test_case_custom_fields then verify by get_test_case_custom_fields", async () => {
    const current = await callTool("get_test_case_custom_fields", {
      testCaseId: testCaseId as number,
      projectId,
    });
    const payload = toCustomFieldUpdatePayload(current);
    if (payload.length === 0) {
      expect(payload).toHaveLength(0);
      return;
    }

    await callTool("set_test_case_custom_fields", {
      testCaseId: testCaseId as number,
      payload,
    });
    const values = await callTool("get_test_case_custom_fields", {
      testCaseId: testCaseId as number,
      projectId,
    });
    expect(values).toBeDefined();
  });

  it("delete_test_case then verify deleted flag by get_test_case", async () => {
    await callTool("delete_test_case", { id: testCaseId as number });
    const deleted = await callTool<JsonRecord>("get_test_case", {
      id: testCaseId as number,
    });
    expect(pickId(deleted)).toBe(testCaseId);
    expect(deleted.deleted).toBe(true);
  });

  it("restore_test_case then verify by get_test_case", async () => {
    await callTool("restore_test_case", { id: testCaseId as number });
    const restored = await callTool<JsonRecord>("get_test_case", {
      id: testCaseId as number,
    });
    expect(pickId(restored)).toBe(testCaseId);
  });
});

if (!integrationEnabled) {
  const missing = getMissingIntegrationEnv().join(", ");
  describe("test case tools integration (skipped)", () => {
    it(`missing env: ${missing}`, () => {
      expect(integrationEnabled).toBe(false);
    });
  });
}
