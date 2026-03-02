export interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties?: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
  };
}

export type ToolHandler = (args: unknown) => Promise<unknown>;

export interface ToolBundle {
  tools: McpToolDefinition[];
  handlers: Record<string, ToolHandler>;
}
