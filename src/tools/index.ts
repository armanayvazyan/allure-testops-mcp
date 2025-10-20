/**
 * Tool Registry - Central export point for all MCP tools
 *
 * This file provides a modular way to organize tools.
 * Tools can be gradually moved from the monolithic structure
 * into separate feature-specific files.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from '../allure-client.js';

// Import modularized tools
import { testCaseTools, handleTestCaseTools } from './test-case-tools.js';
import { accessGroupTools, handleAccessGroupTools } from './access-group-tools.js';
import { analyticsTools, handleAnalyticsTools } from './analytics-tools.js';

// Import remaining tools from backup (to be modularized gradually)
import { getLegacyTools, handleLegacyTools } from './remaining-tools.js';

export interface ToolModule {
  tools: Tool[];
  handler: (name: string, args: any, client: AllureClient) => Promise<any>;
}

// Registry of modularized tool modules
const modularizedModules: ToolModule[] = [
  { tools: testCaseTools, handler: handleTestCaseTools },
  { tools: accessGroupTools, handler: handleAccessGroupTools },
  { tools: analyticsTools, handler: handleAnalyticsTools },
];

// Get all tool names that have been modularized
const modularizedToolNames = new Set(
  modularizedModules.flatMap(m => m.tools.map(t => t.name))
);

// Export function to get all tools
export function getAllTools(): Tool[] {
  const modularized = modularizedModules.flatMap(m => m.tools);
  const legacy = getLegacyTools().filter(t => !modularizedToolNames.has(t.name));
  return [...modularized, ...legacy];
}

// Master handler that delegates to appropriate module
export async function handleToolCall(
  name: string,
  args: any,
  client: AllureClient
): Promise<any> {
  // Try modularized handlers first
  for (const module of modularizedModules) {
    const result = await module.handler(name, args, client);
    if (result !== null) {
      return result;
    }
  }

  // Fall back to legacy handler
  return await handleLegacyTools(name, args, client);
}
