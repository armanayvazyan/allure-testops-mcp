import type { AllureApiClient } from "../client.js";

type QueryValue = string | number | boolean | Array<string | number | boolean>;
type QueryParams = Record<string, QueryValue | undefined>;

type JsonRecord = Record<string, unknown>;
type CustomFieldValueRef = { id?: number; name?: string };
type CustomFieldBulkAddValue = CustomFieldValueRef & { customField: { id: number } };
type TestTagRef = { id?: number; name?: string };
type ExternalLinkRef = { url: string; name?: string; type?: string };

function asRecord(value: unknown): JsonRecord | undefined {
  return value && typeof value === "object" ? (value as JsonRecord) : undefined;
}

function toCustomFieldValueRef(
  value: unknown,
  index: number,
  source: "values" | "flat",
): CustomFieldValueRef {
  const row = asRecord(value);
  if (!row) {
    throw new Error(`"payload[${index}]" must be an object.`);
  }

  const id = typeof row.id === "number" ? row.id : undefined;
  const name = typeof row.name === "string" ? row.name : undefined;
  if (id === undefined && name === undefined) {
    if (source === "values") {
      throw new Error(
        `"payload[${index}].values[]" items must include at least one of "id" or "name".`,
      );
    }
    throw new Error(`"payload[${index}]" must include at least one of "id" or "name".`);
  }

  return {
    ...(id !== undefined ? { id } : {}),
    ...(name !== undefined ? { name } : {}),
  };
}

export function normalizeCustomFieldBulkAddPayload(payload: unknown): CustomFieldBulkAddValue[] {
  if (!Array.isArray(payload)) {
    throw new Error("\"payload\" must be an array.");
  }

  const flattened: CustomFieldBulkAddValue[] = [];

  payload.forEach((entry, index) => {
    const row = asRecord(entry);
    if (!row) {
      throw new Error(`"payload[${index}]" must be an object.`);
    }

    const customField = asRecord(row.customField);
    const customFieldId = customField && typeof customField.id === "number"
      ? customField.id
      : undefined;
    if (customFieldId === undefined) {
      throw new Error(`"payload[${index}].customField.id" must be a number.`);
    }

    if ("values" in row) {
      if (!Array.isArray(row.values)) {
        throw new Error(`"payload[${index}].values" must be an array.`);
      }
      const values = row.values.map((value) => ({
        customField: { id: customFieldId },
        ...toCustomFieldValueRef(value, index, "values"),
      }));
      flattened.push(...values);
      return;
    }

    // Backward-compatible input shape support:
    // [{ id, name, customField: { id } }] -> bulk add cfv payload
    const flatValue = toCustomFieldValueRef(row, index, "flat");
    flattened.push({
      customField: { id: customFieldId },
      ...flatValue,
    });
  });

  if (flattened.length === 0) {
    throw new Error("\"payload\" must contain at least one custom field value.");
  }

  return flattened;
}

export function listTestCases(
  client: AllureApiClient,
  projectId: number,
  query: QueryParams,
): Promise<unknown> {
  return client.get("/api/testcase", {
    projectId,
    ...query,
  });
}

export function searchTestCases(
  client: AllureApiClient,
  projectId: number,
  rql: string,
  query: QueryParams,
): Promise<unknown> {
  return client.get("/api/testcase/__search", {
    projectId,
    rql,
    ...query,
  });
}

export function getTestCase(client: AllureApiClient, id: number): Promise<unknown> {
  return client.get(`/api/testcase/${id}`);
}

export function createTestCase(
  client: AllureApiClient,
  payload: Record<string, unknown>,
): Promise<unknown> {
  return client.post("/api/testcase", payload);
}

export function updateTestCase(
  client: AllureApiClient,
  id: number,
  payload: Record<string, unknown>,
): Promise<unknown> {
  return client.patch(`/api/testcase/${id}`, payload);
}

export function deleteTestCase(client: AllureApiClient, id: number): Promise<unknown> {
  return client.delete(`/api/testcase/${id}`);
}

export function getTestCaseOverview(client: AllureApiClient, testCaseId: number): Promise<unknown> {
  return client.get(`/api/testcase/${testCaseId}/overview`);
}

export function getTestCaseHistory(
  client: AllureApiClient,
  id: number,
  query: QueryParams,
): Promise<unknown> {
  return client.get(`/api/testcase/${id}/history`, query);
}

export function getTestCaseScenario(client: AllureApiClient, id: number): Promise<unknown> {
  return client.get(`/api/testcase/${id}/scenario`);
}

export function getTestCaseSteps(client: AllureApiClient, id: number): Promise<unknown> {
  return client.get(`/api/testcase/${id}/step`);
}

export function getTestCaseTags(client: AllureApiClient, testCaseId: number): Promise<unknown> {
  return client.get(`/api/testcase/${testCaseId}/tag`);
}

export function setTestCaseTags(
  client: AllureApiClient,
  testCaseId: number,
  payload: unknown,
): Promise<unknown> {
  return client.post(`/api/testcase/${testCaseId}/tag`, payload);
}

export function getTestCaseIssues(client: AllureApiClient, testCaseId: number): Promise<unknown> {
  return client.get(`/api/testcase/${testCaseId}/issue`);
}

export function setTestCaseIssues(
  client: AllureApiClient,
  testCaseId: number,
  payload: unknown,
): Promise<unknown> {
  return client.post(`/api/testcase/${testCaseId}/issue`, payload);
}

export function restoreTestCase(client: AllureApiClient, id: number): Promise<unknown> {
  return client.post(`/api/testcase/${id}/restore`);
}

export function listProjectCustomFields(
  client: AllureApiClient,
  projectId: number,
  query: QueryParams,
): Promise<unknown> {
  return client.get(`/api/project/${projectId}/cf`, query);
}

export function listCustomFieldValues(
  client: AllureApiClient,
  projectId: number,
  customFieldId: number,
  query: QueryParams,
): Promise<unknown> {
  return client.get(`/api/project/${projectId}/cfv`, {
    customFieldId,
    ...query,
  });
}

export function getTestCaseCustomFields(
  client: AllureApiClient,
  testCaseId: number,
  projectId: number,
): Promise<unknown> {
  return client.get(`/api/testcase/${testCaseId}/cfv`, {
    projectId,
  });
}

export function setTestCaseCustomFields(
  client: AllureApiClient,
  projectId: number,
  testCaseId: number,
  payload: unknown,
): Promise<unknown> {
  const cfv = normalizeCustomFieldBulkAddPayload(payload);
  return client.post("/api/v2/test-case/bulk/cfv/add", {
    selection: {
      projectId,
      testCasesInclude: [testCaseId],
      inverted: false,
    },
    cfv,
  });
}

export function addTagsToTestCases(
  client: AllureApiClient,
  projectId: number,
  testCaseIds: number[],
  tags: TestTagRef[],
): Promise<unknown> {
  return client.post("/api/v2/test-case/bulk/tag/add", {
    selection: {
      projectId,
      testCasesInclude: testCaseIds,
      inverted: false,
    },
    tags,
  });
}

export function removeTagsFromTestCases(
  client: AllureApiClient,
  projectId: number,
  testCaseIds: number[],
  tagIds: number[],
): Promise<unknown> {
  return client.post("/api/v2/test-case/bulk/tag/remove", {
    selection: {
      projectId,
      testCasesInclude: testCaseIds,
      inverted: false,
    },
    ids: tagIds,
  });
}

export function addExternalLinksToTestCases(
  client: AllureApiClient,
  projectId: number,
  testCaseIds: number[],
  links: ExternalLinkRef[],
): Promise<unknown> {
  return client.post("/api/v2/test-case/bulk/external-link/add", {
    selection: {
      projectId,
      testCasesInclude: testCaseIds,
      inverted: false,
    },
    links,
  });
}
