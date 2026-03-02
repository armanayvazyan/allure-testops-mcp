import { AllureApiClient } from "./client.js";
import { createLaunchTools } from "./tools/launches.js";
import { createTestCaseTools } from "./tools/test-cases.js";
import { createTestPlanTools } from "./tools/test-plans.js";
import { createTestResultTools } from "./tools/test-results.js";
import { McpToolDefinition, ToolHandler } from "./tools/types.js";

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function buildToolRegistry(
  client: AllureApiClient,
): { tools: McpToolDefinition[]; handlers: Map<string, ToolHandler> } {
  const bundles = [
    createTestCaseTools(client),
    createLaunchTools(client),
    createTestResultTools(client),
    createTestPlanTools(client),
  ];

  const tools: McpToolDefinition[] = [];
  const handlers = new Map<string, ToolHandler>();
  for (const bundle of bundles) {
    tools.push(...bundle.tools);
    for (const [name, handler] of Object.entries(bundle.handlers)) {
      handlers.set(name, handler);
    }
  }

  return { tools, handlers };
}
