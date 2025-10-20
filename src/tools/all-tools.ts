/**
 * Main entry point for all MCP tools
 *
 * This file re-exports the tool registry from ./index.ts
 * which manages both modularized and legacy tools.
 */

export { getAllTools, handleToolCall } from './index.js';
