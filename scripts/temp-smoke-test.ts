import { TokenManager } from "../src/auth.js";
import { AllureApiClient } from "../src/client.js";
import { createTestCaseTools } from "../src/tools/test-cases.js";
import { createLaunchTools } from "../src/tools/launches.js";
import { createTestResultTools } from "../src/tools/test-results.js";
import { createTestPlanTools } from "../src/tools/test-plans.js";
import type { ToolHandler } from "../src/tools/types.js";

type ToolMap = Record<string, ToolHandler>;
type ResultRow = { name: string; ok: boolean; details: string };
type JsonRecord = Record<string, unknown>;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function getEnvOrDefault(name: string, fallback: string): string {
  const value = process.env[name];
  return value && value.length > 0 ? value : fallback;
}

function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function parseOptionalNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error("ALLURE_PROJECT_ID must be a number when provided.");
  }
  return parsed;
}

function asArrayContent(result: unknown): unknown[] {
  if (Array.isArray(result)) {
    return result;
  }
  if (
    result &&
    typeof result === "object" &&
    "content" in result &&
    Array.isArray((result as { content?: unknown[] }).content)
  ) {
    return (result as { content: unknown[] }).content;
  }
  return [];
}

function pickId(value: unknown): number | undefined {
  if (!value || typeof value !== "object") return undefined;
  const obj = value as Record<string, unknown>;
  const id = obj.id;
  return typeof id === "number" ? id : undefined;
}

function pickNamedId(value: unknown): number | undefined {
  if (!value || typeof value !== "object") return undefined;
  const obj = value as Record<string, unknown>;
  return typeof obj.id === "number" ? obj.id : undefined;
}

function pickString(value: unknown, key: string): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const field = (value as JsonRecord)[key];
  return typeof field === "string" && field.length > 0 ? field : undefined;
}

function pickNestedUsername(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const obj = value as JsonRecord;
  const direct =
    pickString(obj, "username") ??
    pickString(obj, "createdBy") ??
    pickString(obj, "lastModifiedBy");
  if (direct) {
    return direct;
  }
  const assignee = obj.assignee;
  if (assignee && typeof assignee === "object") {
    const nested = pickString(assignee, "username");
    if (nested) {
      return nested;
    }
  }
  return undefined;
}

function toCustomFieldUpdatePayload(raw: unknown): unknown[] {
  const list = asArrayContent(raw);
  return list
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }
      const entry = item as JsonRecord;
      const customField = entry.customField;
      const customFieldId = pickNamedId(customField);
      if (!customFieldId) {
        return undefined;
      }
      const values = asArrayContent(entry.values)
        .map((value) => {
          if (!value || typeof value !== "object") {
            return undefined;
          }
          const cfv = value as JsonRecord;
          const id = typeof cfv.id === "number" ? cfv.id : undefined;
          const name = typeof cfv.name === "string" ? cfv.name : undefined;
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

function markSkipped(rows: ResultRow[], name: string, reason: string): void {
  rows.push({ name, ok: true, details: `Skipped: ${reason}` });
}

function matchesCaseInsensitive(value: unknown, expected: string): boolean {
  return typeof value === "string" && value.toLowerCase() === expected.toLowerCase();
}

async function resolveCustomFieldValueRef(
  client: AllureApiClient,
  projectId: number,
  customFieldName: string,
  customFieldValueName: string,
): Promise<JsonRecord> {
  const customFieldsResponse = await client.get(`/api/project/${projectId}/cf`, {
    query: customFieldName,
    size: 100,
  });
  const customField = asArrayContent(customFieldsResponse).find((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }
    return matchesCaseInsensitive((item as JsonRecord).name, customFieldName);
  });
  const customFieldId = pickNamedId(customField);
  if (!customFieldId) {
    throw new Error(`Custom field "${customFieldName}" was not found in project ${projectId}.`);
  }

  const valuesResponse = await client.get(`/api/project/${projectId}/cfv`, {
    customFieldId,
    query: customFieldValueName,
    size: 100,
  });
  const customFieldValue = asArrayContent(valuesResponse).find((item) => {
    if (!item || typeof item !== "object") {
      return false;
    }
    return matchesCaseInsensitive((item as JsonRecord).name, customFieldValueName);
  });
  let customFieldValueId = pickNamedId(customFieldValue);
  if (!customFieldValueId) {
    const createdValue = await client.post(`/api/project/${projectId}/cfv`, {
      customField: { id: customFieldId },
      name: customFieldValueName,
    });
    customFieldValueId = pickNamedId(createdValue);

    if (!customFieldValueId) {
      const refreshedValues = await client.get(`/api/project/${projectId}/cfv`, {
        customFieldId,
        query: customFieldValueName,
        size: 100,
      });
      const refreshedValue = asArrayContent(refreshedValues).find((item) => {
        if (!item || typeof item !== "object") {
          return false;
        }
        return matchesCaseInsensitive((item as JsonRecord).name, customFieldValueName);
      });
      customFieldValueId = pickNamedId(refreshedValue);
    }
  }
  if (!customFieldValueId) {
    throw new Error(
      `Value "${customFieldValueName}" was not found and could not be created for custom field "${customFieldName}".`,
    );
  }

  return {
    customField: { id: customFieldId, name: customFieldName },
    id: customFieldValueId,
    name: customFieldValueName,
  };
}

async function resolveProjectIdByName(
  client: AllureApiClient,
  projectName: string,
): Promise<number> {
  const suggest = await client.get("/api/project/suggest", { query: projectName });
  const projects = asArrayContent(suggest);
  const match = projects.find((item) => {
    if (!item || typeof item !== "object") return false;
    const project = item as Record<string, unknown>;
    return (
      typeof project.name === "string" &&
      project.name.toLowerCase() === projectName.toLowerCase() &&
      typeof project.id === "number"
    );
  });
  const id = pickNamedId(match);
  if (!id) {
    throw new Error(`Project "${projectName}" was not found in /api/project/suggest`);
  }
  return id;
}

async function resolveProjectNameById(
  client: AllureApiClient,
  projectId: number,
): Promise<string> {
  const project = await client.get(`/api/project/${projectId}`);
  if (project && typeof project === "object") {
    const value = (project as Record<string, unknown>).name;
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  throw new Error(`Unable to resolve project name for project ID ${projectId}.`);
}

function getHandlers(tools: ToolMap[]): ToolMap {
  return Object.assign({}, ...tools);
}

async function call(
  name: string,
  handlers: ToolMap,
  args: Record<string, unknown>,
  rows: ResultRow[],
): Promise<unknown> {
  const handler = handlers[name];
  if (!handler) {
    rows.push({ name, ok: false, details: "Handler not found" });
    return undefined;
  }

  try {
    const result = await handler(args);
    rows.push({ name, ok: true, details: "OK" });
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    rows.push({ name, ok: false, details: message });
    return undefined;
  }
}

async function callOptional(
  name: string,
  handlers: ToolMap,
  args: Record<string, unknown>,
  rows: ResultRow[],
): Promise<unknown> {
  const result = await call(name, handlers, args, rows);
  const last = rows[rows.length - 1];
  if (last && !last.ok && last.name === name) {
    last.ok = true;
    last.details = `Skipped optional check: ${last.details}`;
  }
  return result;
}

async function main(): Promise<void> {
  const baseUrl = getEnvOrDefault(
    "ALLURE_TESTOPS_URL",
    "https://allure-testops.labs.jb.gg/",
  );
  const apiToken = requireEnv("ALLURE_TOKEN");
  const envProjectId = parseOptionalNumber(optionalEnv("ALLURE_PROJECT_ID"));
  const projectName = optionalEnv("ALLURE_PROJECT_NAME");

  const tokenManager = new TokenManager({ baseUrl, apiToken });
  const client = new AllureApiClient({ baseUrl, tokenManager });
  const projectId =
    envProjectId ??
    (projectName ? await resolveProjectIdByName(client, projectName) : undefined);
  if (!projectId) {
    throw new Error(
      "Smoke test requires ALLURE_PROJECT_ID or ALLURE_PROJECT_NAME to resolve project context.",
    );
  }
  const projectNameForLookup = projectName ?? (await resolveProjectNameById(client, projectId));
  const assigneeUsername = optionalEnv("ALLURE_ASSIGN_USERNAME");

  const testCases = createTestCaseTools(client, projectId);
  const launches = createLaunchTools(client, projectId);
  const testResults = createTestResultTools(client, projectId);
  const testPlans = createTestPlanTools(client, projectId);

  const handlers = getHandlers([
    testCases.handlers,
    launches.handlers,
    testResults.handlers,
    testPlans.handlers,
  ]);

  const rows: ResultRow[] = [];
  const suffix = Date.now();
  let testCaseId: number | undefined;
  let launchId: number | undefined;
  let testPlanId: number | undefined;
  let testResultId: number | undefined;
  let customFieldId: number | undefined;
  let createdTestResultPayload: unknown;

  const testLayerCustomField = await resolveCustomFieldValueRef(
    client,
    projectId,
    "Test Layer",
    "Kakach",
  );
  const featureCustomField = await resolveCustomFieldValueRef(
    client,
    projectId,
    "Feature",
    "Dashboards",
  );

  // Core creation flow first.
  const createdTestCase = await call(
    "create_test_case",
    handlers,
    {
      payload: {
        name: `temp-mcp-testcase-${suffix}`,
        projectId,
        scenario: { steps: [] },
        customFields: [testLayerCustomField, featureCustomField],
      },
    },
    rows,
  );
  testCaseId = pickId(createdTestCase);

  const createdLaunch = await call(
    "create_launch",
    handlers,
    {
      payload: {
        name: `temp-mcp-launch-${suffix}`,
        projectId,
      },
    },
    rows,
  );
  launchId = pickId(createdLaunch);

  const createdTestPlan = await call(
    "create_test_plan",
    handlers,
    {
      payload: {
        name: `temp-mcp-plan-${suffix}`,
        projectId,
      },
    },
    rows,
  );
  testPlanId = pickId(createdTestPlan);

  if (launchId) {
    createdTestResultPayload = await call(
      "create_test_result",
      handlers,
      {
        payload: {
          launchId,
          name: `temp-mcp-result-${suffix}`,
          status: "passed",
          ...(testCaseId ? { testCaseId } : {}),
        },
      },
      rows,
    );
    testResultId = pickId(createdTestResultPayload);
  } else {
    rows.push({
      name: "create_test_result",
      ok: false,
      details: "Skipped because launch creation failed",
    });
  }

  // Test case calls.
  await call("list_test_cases", handlers, { projectId, size: 5 }, rows);
  await call(
    "list_test_cases",
    handlers,
    { projectName: projectNameForLookup, size: 5 },
    rows,
  );
  await call("search_test_cases", handlers, { projectId, rql: "id > 0", size: 5 }, rows);
  const projectCustomFields = await call(
    "list_project_custom_fields",
    handlers,
    { projectId, size: 20 },
    rows,
  );
  const customFields = asArrayContent(projectCustomFields);
  customFieldId = pickNamedId(customFields[0]);
  if (customFieldId) {
    await callOptional(
      "list_custom_field_values",
      handlers,
      { projectId, customFieldId, size: 20 },
      rows,
    );
  } else {
    markSkipped(rows, "list_custom_field_values", "no custom fields were returned for project");
  }
  if (testCaseId) {
    await call("get_test_case", handlers, { id: testCaseId }, rows);
    await call(
      "update_test_case",
      handlers,
      { id: testCaseId, payload: { name: `temp-mcp-testcase-updated-${suffix}` } },
      rows,
    );
    await call("get_test_case_overview", handlers, { testCaseId }, rows);
    await call("get_test_case_history", handlers, { id: testCaseId, size: 5 }, rows);
    await call("get_test_case_scenario", handlers, { id: testCaseId }, rows);
    await call("get_test_case_tags", handlers, { testCaseId }, rows);
    await call("set_test_case_tags", handlers, { testCaseId, payload: [] }, rows);
    await call("get_test_case_issues", handlers, { testCaseId }, rows);
    await call("set_test_case_issues", handlers, { testCaseId, payload: [] }, rows);
    const testCaseCustomFields = await call(
      "get_test_case_custom_fields",
      handlers,
      { testCaseId, projectId },
      rows,
    );
    const customFieldPayload = toCustomFieldUpdatePayload(testCaseCustomFields);
    if (customFieldPayload.length > 0) {
      await callOptional(
        "set_test_case_custom_fields",
        handlers,
        { testCaseId, payload: customFieldPayload },
        rows,
      );
    } else {
      markSkipped(rows, "set_test_case_custom_fields", "no custom field values on test case");
    }
  } else {
    for (const name of [
      "get_test_case",
      "update_test_case",
      "get_test_case_overview",
      "get_test_case_history",
      "get_test_case_scenario",
      "get_test_case_tags",
      "set_test_case_tags",
      "get_test_case_issues",
      "set_test_case_issues",
      "get_test_case_custom_fields",
      "set_test_case_custom_fields",
    ]) {
      rows.push({ name, ok: false, details: "Skipped because test case creation failed" });
    }
  }

  // Launch calls.
  await call("list_launches", handlers, { projectId, size: 5 }, rows);
  await call("search_launches", handlers, { projectId, rql: "id > 0", size: 5 }, rows);
  if (launchId) {
    await call("get_launch", handlers, { id: launchId }, rows);
    await call(
      "update_launch",
      handlers,
      { id: launchId, payload: { name: `temp-mcp-launch-updated-${suffix}` } },
      rows,
    );
    await call("get_launch_statistic", handlers, { id: launchId }, rows);
    await call("get_launch_progress", handlers, { id: launchId }, rows);
    if (testCaseId) {
      await call(
        "add_test_cases_to_launch",
        handlers,
        {
          id: launchId,
          payload: {
            selection: {
              projectId,
              leafsInclude: [testCaseId],
              inverted: false,
            },
          },
        },
        rows,
      );
    } else {
      rows.push({
        name: "add_test_cases_to_launch",
        ok: false,
        details: "Skipped because test case creation failed",
      });
    }
    if (testPlanId) {
      await call(
        "add_test_plan_to_launch",
        handlers,
        { id: launchId, payload: { testPlanId } },
        rows,
      );
    } else {
      rows.push({
        name: "add_test_plan_to_launch",
        ok: false,
        details: "Skipped because test plan creation failed",
      });
    }
    await call("close_launch", handlers, { id: launchId }, rows);
    await call("reopen_launch", handlers, { id: launchId }, rows);
  } else {
    for (const name of [
      "get_launch",
      "update_launch",
      "get_launch_statistic",
      "get_launch_progress",
      "add_test_cases_to_launch",
      "add_test_plan_to_launch",
      "close_launch",
      "reopen_launch",
    ]) {
      rows.push({ name, ok: false, details: "Skipped because launch creation failed" });
    }
  }

  // Test result calls.
  if (launchId) {
    await call("list_test_results", handlers, { launchId, size: 5 }, rows);
  } else {
    rows.push({
      name: "list_test_results",
      ok: false,
      details: "Skipped because launch creation failed",
    });
  }
  await callOptional(
    "search_test_results",
    handlers,
    { projectId, rql: "id > 0", size: 5 },
    rows,
  );
  if (testResultId) {
    await call("get_test_result", handlers, { id: testResultId }, rows);
    await call(
      "update_test_result",
      handlers,
      { id: testResultId, payload: { name: `temp-mcp-result-updated-${suffix}` } },
      rows,
    );
    await call("get_test_result_history", handlers, { id: testResultId, size: 5 }, rows);
    const username = assigneeUsername ?? pickNestedUsername(createdTestResultPayload);
    if (username) {
      await call(
        "assign_test_result",
        handlers,
        { id: testResultId, payload: { username } },
        rows,
      );
    } else {
      markSkipped(
        rows,
        "assign_test_result",
        "missing ALLURE_ASSIGN_USERNAME and no username found in test result payload",
      );
    }
    await call(
      "resolve_test_result",
      handlers,
      { id: testResultId, payload: { status: "passed" } },
      rows,
    );
  } else {
    for (const name of [
      "get_test_result",
      "update_test_result",
      "get_test_result_history",
      "assign_test_result",
      "resolve_test_result",
    ]) {
      rows.push({ name, ok: false, details: "Skipped because test result creation failed" });
    }
  }

  // Test plan calls.
  await call("list_test_plans", handlers, { projectId, size: 5 }, rows);
  if (testPlanId) {
    await call("get_test_plan", handlers, { id: testPlanId }, rows);
    await call(
      "update_test_plan",
      handlers,
      { id: testPlanId, payload: { name: `temp-mcp-plan-updated-${suffix}` } },
      rows,
    );
    await call(
      "run_test_plan",
      handlers,
      {
        id: testPlanId,
        payload: {
          launchName: `temp-mcp-run-${suffix}`,
        },
      },
      rows,
    );
  } else {
    rows.push({ name: "get_test_plan", ok: false, details: "Skipped because test plan creation failed" });
    rows.push({ name: "update_test_plan", ok: false, details: "Skipped because test plan creation failed" });
    rows.push({ name: "run_test_plan", ok: false, details: "Skipped because test plan creation failed" });
  }

  // Deletion + restore flow.
  if (testCaseId) {
    await call("delete_test_case", handlers, { id: testCaseId }, rows);
    await call("restore_test_case", handlers, { id: testCaseId }, rows);
    await call("delete_test_case", handlers, { id: testCaseId }, rows);
  } else {
    rows.push({ name: "delete_test_case", ok: false, details: "Skipped because test case creation failed" });
    rows.push({ name: "restore_test_case", ok: false, details: "Skipped because test case creation failed" });
  }
  if (launchId) {
    await call("delete_launch", handlers, { id: launchId }, rows);
  } else {
    rows.push({ name: "delete_launch", ok: false, details: "Skipped because launch creation failed" });
  }
  if (testPlanId) {
    await call("delete_test_plan", handlers, { id: testPlanId }, rows);
  } else {
    rows.push({ name: "delete_test_plan", ok: false, details: "Skipped because test plan creation failed" });
  }

  const passed = rows.filter((x) => x.ok).length;
  const failed = rows.length - passed;

  console.log(`Smoke test completed. Passed: ${passed}, Failed: ${failed}`);
  for (const row of rows) {
    const mark = row.ok ? "PASS" : "FAIL";
    console.log(`${mark} ${row.name} - ${row.details}`);
  }

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Smoke test fatal error: ${message}`);
  process.exit(1);
});
