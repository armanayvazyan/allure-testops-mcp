import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createLaunchTools } from "../src/tools/launches.js";
import { createTestCaseTools } from "../src/tools/test-cases.js";
import { createTestPlanTools } from "../src/tools/test-plans.js";
import { createTestResultTools } from "../src/tools/test-results.js";
import type { McpToolDefinition } from "../src/tools/types.js";

interface ToolCategory {
  name: string;
  tools: McpToolDefinition[];
}

interface ToolCatalog {
  generatedAt: string;
  totalTools: number;
  categories: ToolCategory[];
}

function buildCatalog(): ToolCatalog {
  const noopClient = new Proxy(
    {},
    {
      get() {
        throw new Error("Client access is not expected while generating tool catalog.");
      },
    },
  );

  const categories: ToolCategory[] = [
    { name: "Test Cases", tools: createTestCaseTools(noopClient as never).tools },
    { name: "Launches", tools: createLaunchTools(noopClient as never).tools },
    { name: "Test Results", tools: createTestResultTools(noopClient as never).tools },
    { name: "Test Plans", tools: createTestPlanTools(noopClient as never).tools },
  ];

  const totalTools = categories.reduce((acc, category) => acc + category.tools.length, 0);

  return {
    generatedAt: new Date().toISOString(),
    totalTools,
    categories,
  };
}

async function main(): Promise<void> {
  const catalog = buildCatalog();
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const outputPath = path.resolve(scriptDir, "../docs/tools.json");
  await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  process.stdout.write(`Generated ${catalog.totalTools} tools in ${outputPath}\n`);
}

await main();
