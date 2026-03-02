import { expect, vi } from "vitest";
import type { ToolBundle, McpToolDefinition } from "../../src/tools/types.js";

type MockClient = {
  defaultProjectId?: number;
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

export function createMockClient(defaultProjectId?: number): MockClient {
  return {
    defaultProjectId,
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };
}

export function expectToolHandlerParity(bundle: ToolBundle): void {
  const toolNames = bundle.tools.map((tool) => tool.name);
  const handlerNames = Object.keys(bundle.handlers);

  expect(new Set(toolNames).size).toBe(toolNames.length);
  expect(new Set(handlerNames).size).toBe(handlerNames.length);
  expect(handlerNames.sort()).toEqual(toolNames.sort());
}

export function expectObjectSchemas(bundle: ToolBundle): void {
  for (const tool of bundle.tools) {
    expect(tool.inputSchema.type).toBe("object");
    if (tool.inputSchema.required) {
      const properties = tool.inputSchema.properties ?? {};
      for (const key of tool.inputSchema.required) {
        expect(Object.prototype.hasOwnProperty.call(properties, key)).toBe(true);
      }
    }
  }
}

export function getToolSchema(
  tools: McpToolDefinition[],
  name: string,
): McpToolDefinition["inputSchema"] {
  const tool = tools.find((item) => item.name === name);
  expect(tool).toBeDefined();
  return (tool as McpToolDefinition).inputSchema;
}

export function expectRequiredFields(
  tools: McpToolDefinition[],
  name: string,
  expectedFields: string[],
): void {
  const schema = getToolSchema(tools, name);
  expect(schema.required ?? []).toEqual(expectedFields);
}

export function expectSchemaProperty(
  tools: McpToolDefinition[],
  name: string,
  propertyName: string,
): void {
  const schema = getToolSchema(tools, name);
  const properties = schema.properties ?? {};
  expect(Object.prototype.hasOwnProperty.call(properties, propertyName)).toBe(true);
}
