#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { TokenManager } from "./auth.js";
import { AllureApiClient } from "./client.js";
import { createLaunchTools } from "./tools/launches.js";
import { createTestCaseTools } from "./tools/test-cases.js";
import { createTestPlanTools } from "./tools/test-plans.js";
import { createTestResultTools } from "./tools/test-results.js";
import { ToolHandler, McpToolDefinition } from "./tools/types.js";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseOptionalProjectId(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error("ALLURE_PROJECT_ID must be a number when provided.");
  }
  return parsed;
}

function formatToolResult(result: unknown): string {
  if (result === undefined) {
    return "OK";
  }
  if (typeof result === "string") {
    return result;
  }
  return JSON.stringify(result, null, 2);
}

async function main(): Promise<void> {
  const baseUrl = requiredEnv("ALLURE_TESTOPS_URL");
  const apiToken = requiredEnv("ALLURE_TOKEN");
  const defaultProjectId = parseOptionalProjectId(process.env.ALLURE_PROJECT_ID);

  const tokenManager = new TokenManager({ baseUrl, apiToken });
  const client = new AllureApiClient({ baseUrl, tokenManager });

  const bundles = [
    createTestCaseTools(client, defaultProjectId),
    createLaunchTools(client, defaultProjectId),
    createTestResultTools(client, defaultProjectId),
    createTestPlanTools(client, defaultProjectId),
  ];

  const tools: McpToolDefinition[] = [];
  const handlers = new Map<string, ToolHandler>();
  for (const bundle of bundles) {
    tools.push(...bundle.tools);
    for (const [name, handler] of Object.entries(bundle.handlers)) {
      handlers.set(name, handler);
    }
  }

  const server = new Server(
    { name: "allure-testops-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const toolName = request.params.name;
      const handler = handlers.get(toolName);
      if (!handler) {
        throw new Error(`Unknown tool: ${toolName}`);
      }

      const result = await handler(request.params.arguments);
      return {
        content: [
          {
            type: "text",
            text: formatToolResult(result),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: ${message}`,
          },
        ],
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Allure TestOps MCP server started.");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Fatal startup error: ${message}`);
  process.exit(1);
});
