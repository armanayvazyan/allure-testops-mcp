import { TokenManager } from "../../src/auth.js";
import { AllureApiClient } from "../../src/client.js";
import { createLaunchTools } from "../../src/tools/launches.js";
import { createTestCaseTools } from "../../src/tools/test-cases.js";
import { createTestPlanTools } from "../../src/tools/test-plans.js";
import { createTestResultTools } from "../../src/tools/test-results.js";
import type { ToolHandler } from "../../src/tools/types.js";

type ToolArgs = Record<string, unknown>;
type ToolMap = Record<string, ToolHandler>;
type JsonRecord = Record<string, unknown>;

interface IntegrationContext {
  projectId: number;
  client: AllureApiClient;
  handlers: ToolMap;
}

const requiredEnvNames = [
  "ALLURE_TESTOPS_URL",
  "ALLURE_TOKEN",
  "ALLURE_PROJECT_ID",
] as const;

let cachedContext: IntegrationContext | null = null;

function getMissingRequiredEnv(): string[] {
  return requiredEnvNames.filter((name) => {
    const value = process.env[name];
    return !value || value.trim().length === 0;
  });
}

export const integrationEnabled = getMissingRequiredEnv().length === 0;

export function getMissingIntegrationEnv(): string[] {
  return getMissingRequiredEnv();
}

function parseProjectId(raw: string): number {
  const projectId = Number(raw);
  if (Number.isNaN(projectId)) {
    throw new Error("ALLURE_PROJECT_ID must be a number.");
  }
  return projectId;
}

function getHandlers(tools: ToolMap[]): ToolMap {
  return Object.assign({}, ...tools);
}

function createContext(): IntegrationContext {
  const missing = getMissingRequiredEnv();
  if (missing.length > 0) {
    throw new Error(
      `Missing required env vars for integration tests: ${missing.join(", ")}`,
    );
  }

  const baseUrl = process.env.ALLURE_TESTOPS_URL as string;
  const apiToken = process.env.ALLURE_TOKEN as string;
  const projectId = parseProjectId(process.env.ALLURE_PROJECT_ID as string);

  const tokenManager = new TokenManager({ baseUrl, apiToken });
  const client = new AllureApiClient({ baseUrl, tokenManager });

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

  return { projectId, client, handlers };
}

function getContext(): IntegrationContext {
  if (!cachedContext) {
    cachedContext = createContext();
  }
  return cachedContext;
}

export function getProjectId(): number {
  return getContext().projectId;
}

export function getClient(): AllureApiClient {
  return getContext().client;
}

export async function callTool<T>(
  name: string,
  args: ToolArgs = {},
): Promise<T> {
  const handler = getContext().handlers[name];
  if (!handler) {
    throw new Error(`Unknown tool handler in integration setup: ${name}`);
  }
  return (await handler(args)) as T;
}

export function uniqueName(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function asArrayContent(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (
    value &&
    typeof value === "object" &&
    "content" in value &&
    Array.isArray((value as { content?: unknown[] }).content)
  ) {
    return (value as { content: unknown[] }).content;
  }
  return [];
}

export function pickId(value: unknown): number | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const id = (value as JsonRecord).id;
  return typeof id === "number" ? id : undefined;
}

export function pickString(value: unknown, key: string): string | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const field = (value as JsonRecord)[key];
  return typeof field === "string" ? field : undefined;
}

export async function callSafe(
  name: string,
  args: ToolArgs = {},
): Promise<void> {
  try {
    await callTool(name, args);
  } catch {
    // Best effort cleanup.
  }
}
