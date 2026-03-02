#!/usr/bin/env node

import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { TokenManager } from "../src/auth.js";
import { AllureApiClient } from "../src/client.js";
import { buildToolRegistry, parseOptionalProjectId, requiredEnv } from "../src/server-bootstrap.js";

const DEFAULT_PORT = 3333;

function stripWrappingQuotes(value: string): string {
  if (
    (value.startsWith("\"") && value.endsWith("\"")) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function loadDotEnvFile(): void {
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) {
    return;
  }

  const contents = readFileSync(envPath, "utf8");
  for (const rawLine of contents.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    if (!key || key in process.env) {
      continue;
    }

    process.env[key] = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());
  }
}

function parsePort(value: string | undefined): number {
  if (!value) {
    return DEFAULT_PORT;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error("DEV_UI_PORT must be a valid port number (1-65535).");
  }
  return parsed;
}

async function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  res.statusCode = statusCode;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res: ServerResponse, html: string): void {
  res.statusCode = 200;
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(html);
}

function notFound(res: ServerResponse): void {
  sendJson(res, 404, { error: "Not Found" });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Allure MCP Local Debug UI</title>
    <style>
      :root {
        --bg: #0f1116;
        --panel: #171a22;
        --panel-alt: #1d2230;
        --panel-border: #2a3240;
        --text: #eaf0ff;
        --muted: #9aa8c3;
        --accent: #3b82f6;
        --ok: #16a34a;
        --warn: #f59e0b;
        --error: #dc2626;
        --input-bg: #121722;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        background: var(--bg);
        color: var(--text);
      }

      .layout {
        display: grid;
        grid-template-columns: 320px 1fr 360px;
        min-height: 100vh;
      }

      .left, .right {
        background: var(--panel);
        border-right: 1px solid var(--panel-border);
      }
      .right {
        border-right: 0;
        border-left: 1px solid var(--panel-border);
      }

      .panel-header {
        padding: 12px;
        border-bottom: 1px solid var(--panel-border);
      }
      .panel-title {
        margin: 0 0 8px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: .2px;
      }
      .muted {
        color: var(--muted);
        font-size: 12px;
      }

      .search {
        width: 100%;
        padding: 9px 10px;
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        background: var(--input-bg);
        color: var(--text);
      }

      .tool-list {
        overflow-y: auto;
        padding: 8px;
        max-height: calc(100vh - 122px);
      }

      .tool-btn {
        width: 100%;
        text-align: left;
        padding: 10px;
        border: 1px solid transparent;
        border-radius: 10px;
        color: var(--text);
        background: transparent;
        cursor: pointer;
        margin-bottom: 7px;
      }
      .tool-btn:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      .tool-btn.active {
        border-color: var(--accent);
        background: rgba(59, 130, 246, 0.14);
      }

      .tool-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
      }
      .tool-name {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
      }
      .tag {
        font-size: 11px;
        border-radius: 999px;
        padding: 2px 7px;
        border: 1px solid var(--panel-border);
        color: var(--muted);
      }
      .tag.ok {
        border-color: rgba(22, 163, 74, 0.6);
        color: #86efac;
      }

      .tool-desc {
        margin-top: 6px;
        font-size: 12px;
        color: var(--muted);
        line-height: 1.3;
      }

      .main {
        display: flex;
        flex-direction: column;
      }

      .toolbar {
        padding: 12px;
        border-bottom: 1px solid var(--panel-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }

      .status {
        font-size: 12px;
        color: var(--muted);
      }

      .history {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
      }

      .history-item {
        margin-bottom: 14px;
      }
      .bubble {
        border: 1px solid var(--panel-border);
        border-radius: 10px;
        padding: 10px;
        background: var(--panel);
      }
      .bubble + .bubble {
        margin-top: 8px;
      }
      .bubble.error {
        border-color: var(--error);
      }
      .bubble-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .bubble-title {
        font-size: 12px;
        font-weight: 700;
      }
      .meta {
        font-size: 12px;
        color: var(--muted);
      }
      .bubble pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 12px;
      }

      .composer {
        border-top: 1px solid var(--panel-border);
        padding: 12px;
        background: var(--panel);
      }
      .composer-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
      }
      .tool-input, .args-input {
        width: 100%;
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        background: var(--input-bg);
        color: var(--text);
      }
      .tool-input {
        padding: 8px 10px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
      }
      .args-input {
        min-height: 165px;
        padding: 10px;
        resize: vertical;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
      }
      .buttons {
        display: flex;
        gap: 8px;
      }

      button {
        border: 1px solid var(--panel-border);
        background: var(--panel-alt);
        color: var(--text);
        padding: 8px 10px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
      }
      button.primary {
        border-color: var(--accent);
        background: var(--accent);
        color: #fff;
        font-weight: 600;
      }
      button.copy-btn {
        font-size: 11px;
        padding: 4px 8px;
      }
      button:disabled {
        opacity: .5;
        cursor: not-allowed;
      }

      .composer-help {
        margin-top: 8px;
        color: var(--muted);
        font-size: 12px;
      }

      .details {
        padding: 12px;
        overflow-y: auto;
        max-height: 100vh;
      }
      .card {
        border: 1px solid var(--panel-border);
        border-radius: 10px;
        background: var(--panel-alt);
        padding: 10px;
        margin-bottom: 10px;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: 12px;
      }
      .mono {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        font-size: 12px;
      }
      .list {
        margin: 0;
        padding-left: 18px;
      }
      .list li {
        margin-bottom: 4px;
        color: var(--muted);
        font-size: 12px;
      }
      .toast {
        position: fixed;
        right: 16px;
        bottom: 16px;
        background: #111827;
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 12px;
        opacity: 0;
        pointer-events: none;
        transform: translateY(10px);
        transition: all .2s ease;
      }
      .toast.show {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <aside class="left">
        <div class="panel-header">
          <h1 class="panel-title">Tools</h1>
          <input id="search" class="search" placeholder="Search by name/description..." />
          <div id="toolCount" class="muted" style="margin-top:8px;"></div>
        </div>
        <div id="toolList" class="tool-list"></div>
      </aside>

      <main class="main">
        <div class="toolbar">
          <div id="status" class="status">Loading tools...</div>
          <div class="buttons">
            <button id="formatArgs">Format JSON</button>
            <button id="clearHistory">Clear history</button>
          </div>
        </div>

        <section id="history" class="history"></section>

        <section class="composer">
          <div class="composer-row">
            <input id="selectedTool" class="tool-input" readonly />
            <div class="buttons">
              <button id="useRequiredExample">Required payload</button>
              <button id="useFullExample">Required + optional payload</button>
              <button id="useLastWorking">Last working example</button>
              <button id="callBtn" class="primary">Call tool</button>
            </div>
          </div>
          <textarea id="argsInput" class="args-input" spellcheck="false"></textarea>
          <div class="composer-help">Tip: Press Ctrl/Cmd + Enter to call the selected tool.</div>
        </section>
      </main>

      <aside class="right">
        <div class="panel-header">
          <h2 class="panel-title">Tool details</h2>
          <div class="muted">Understand schema and use working examples faster.</div>
        </div>
        <div class="details">
          <div class="card">
            <h3>Selected tool</h3>
            <div id="detailToolName" class="mono"></div>
          </div>
          <div class="card">
            <h3>Description</h3>
            <div id="detailDescription" class="muted"></div>
          </div>
          <div class="card">
            <h3>Required fields</h3>
            <ul id="requiredFields" class="list"></ul>
          </div>
          <div class="card">
            <h3>Payload example (required only)</h3>
            <div class="buttons" style="margin-bottom:8px;">
              <button id="applyRequiredPayload">Use in editor</button>
            </div>
            <pre id="requiredPayloadExample" class="mono"></pre>
          </div>
          <div class="card">
            <h3>Payload example (required + optional)</h3>
            <div class="buttons" style="margin-bottom:8px;">
              <button id="applyFullPayload">Use in editor</button>
            </div>
            <pre id="fullPayloadExample" class="mono"></pre>
          </div>
          <div class="card">
            <h3>Known working example</h3>
            <div id="workingExampleState" class="muted"></div>
          </div>
        </div>
      </aside>
    </div>

    <div id="toast" class="toast"></div>

    <script>
      const LAST_SUCCESS_STORAGE_KEY = "allureMcpDebugLastSuccessArgs";

      const state = {
        tools: [],
        filteredTools: [],
        selectedTool: null,
        lastSuccessByTool: {}
      };

      const historyEl = document.getElementById("history");
      const statusEl = document.getElementById("status");
      const toolCountEl = document.getElementById("toolCount");
      const toolListEl = document.getElementById("toolList");
      const searchEl = document.getElementById("search");
      const selectedToolEl = document.getElementById("selectedTool");
      const argsInputEl = document.getElementById("argsInput");
      const callBtn = document.getElementById("callBtn");
      const clearHistoryBtn = document.getElementById("clearHistory");
      const formatArgsBtn = document.getElementById("formatArgs");
      const useRequiredExampleBtn = document.getElementById("useRequiredExample");
      const useFullExampleBtn = document.getElementById("useFullExample");
      const useLastWorkingBtn = document.getElementById("useLastWorking");
      const toastEl = document.getElementById("toast");

      const detailToolNameEl = document.getElementById("detailToolName");
      const detailDescriptionEl = document.getElementById("detailDescription");
      const requiredFieldsEl = document.getElementById("requiredFields");
      const requiredPayloadExampleEl = document.getElementById("requiredPayloadExample");
      const fullPayloadExampleEl = document.getElementById("fullPayloadExample");
      const applyRequiredPayloadBtn = document.getElementById("applyRequiredPayload");
      const applyFullPayloadBtn = document.getElementById("applyFullPayload");
      const workingExampleStateEl = document.getElementById("workingExampleState");

      function showToast(message) {
        toastEl.textContent = message;
        toastEl.classList.add("show");
        window.setTimeout(() => {
          toastEl.classList.remove("show");
        }, 1500);
      }

      function jsonPretty(value) {
        return JSON.stringify(value, null, 2);
      }

      function loadLastSuccess() {
        try {
          const raw = localStorage.getItem(LAST_SUCCESS_STORAGE_KEY);
          if (!raw) return {};
          const parsed = JSON.parse(raw);
          if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
          return parsed;
        } catch (_) {
          return {};
        }
      }

      function saveLastSuccess() {
        try {
          localStorage.setItem(LAST_SUCCESS_STORAGE_KEY, JSON.stringify(state.lastSuccessByTool));
        } catch (_) {
          // ignore storage failures
        }
      }

      function guessStringByKey(keyName) {
        const lower = String(keyName || "").toLowerCase();
        if (lower.includes("projectname")) return "Demo Project";
        if (lower.includes("username") || lower.includes("assignee")) return "admin";
        if (lower.includes("status")) return "PASSED";
        if (lower.includes("query")) return "manual=true";
        if (lower.includes("tag")) return "smoke";
        if (lower.includes("issue")) return "BUG-123";
        if (lower.includes("description")) return "Sample description";
        if (lower.includes("title") || lower.includes("name")) return "Sample item";
        if (lower.includes("id")) return "1";
        return "value";
      }

      function guessNumberByKey(keyName) {
        const lower = String(keyName || "").toLowerCase();
        if (lower === "page") return 0;
        if (lower === "size") return 20;
        if (lower.includes("id")) return 1;
        return 1;
      }

      function schemaValue(schemaNode, keyName, includeOptionalFields) {
        if (!schemaNode || typeof schemaNode !== "object") return null;
        if (Object.prototype.hasOwnProperty.call(schemaNode, "default")) return schemaNode.default;
        if (Array.isArray(schemaNode.enum) && schemaNode.enum.length > 0) return schemaNode.enum[0];
        if (Array.isArray(schemaNode.anyOf) && schemaNode.anyOf.length > 0) {
          return schemaValue(schemaNode.anyOf[0], keyName, includeOptionalFields);
        }
        if (Array.isArray(schemaNode.oneOf) && schemaNode.oneOf.length > 0) {
          return schemaValue(schemaNode.oneOf[0], keyName, includeOptionalFields);
        }

        const type = schemaNode.type;
        if (type === "object") {
          const out = {};
          const props = schemaNode.properties && typeof schemaNode.properties === "object" ? schemaNode.properties : {};
          const required = Array.isArray(schemaNode.required) ? schemaNode.required : [];
          const keys = includeOptionalFields ? Object.keys(props) : required;
          for (const key of keys) {
            out[key] = schemaValue(props[key], key, includeOptionalFields);
          }
          return out;
        }
        if (type === "array") {
          if (schemaNode.items && typeof schemaNode.items === "object") {
            return [schemaValue(schemaNode.items, keyName, includeOptionalFields)];
          }
          return [];
        }
        if (type === "number" || type === "integer") return guessNumberByKey(keyName);
        if (type === "boolean") return false;
        if (type === "string") return guessStringByKey(keyName);
        return null;
      }

      function buildRequiredPayloadExample(tool) {
        const schema = tool && tool.inputSchema;
        const properties = schema && schema.properties && typeof schema.properties === "object" ? schema.properties : {};
        const required = Array.isArray(schema && schema.required) ? schema.required : [];
        const out = {};

        for (const reqKey of required) {
          out[reqKey] = schemaValue(properties[reqKey], reqKey, false);
        }
        return out;
      }

      function buildFullPayloadExample(tool) {
        const schema = tool && tool.inputSchema;
        const properties = schema && schema.properties && typeof schema.properties === "object" ? schema.properties : {};
        const out = {};

        for (const key of Object.keys(properties)) {
          out[key] = schemaValue(properties[key], key, true);
        }
        return out;
      }

      function renderPayloadExamples(tool) {
        if (!tool) {
          requiredPayloadExampleEl.textContent = "{}";
          fullPayloadExampleEl.textContent = "{}";
          return;
        }

        const requiredPayload = buildRequiredPayloadExample(tool);
        const fullPayload = buildFullPayloadExample(tool);
        requiredPayloadExampleEl.textContent = jsonPretty(requiredPayload);
        fullPayloadExampleEl.textContent = jsonPretty(fullPayload);
      }

      function getRequiredFields(tool) {
        const required = tool && tool.inputSchema && Array.isArray(tool.inputSchema.required) ? tool.inputSchema.required : [];
        return required.slice();
      }

      async function copyText(text) {
        try {
          await navigator.clipboard.writeText(text);
          showToast("Copied");
        } catch (_) {
          showToast("Copy failed");
        }
      }

      function appendPair(toolName, args, responsePayload, meta, isError) {
        const item = document.createElement("article");
        item.className = "history-item";

        const requestBubble = document.createElement("div");
        requestBubble.className = "bubble";
        requestBubble.appendChild(makeBubbleHeader("-> " + toolName, ""));
        requestBubble.appendChild(makePayloadPre(args));

        const responseBubble = document.createElement("div");
        responseBubble.className = isError ? "bubble error" : "bubble";
        responseBubble.appendChild(makeBubbleHeader(isError ? "<- Error" : "<- Response", meta));
        responseBubble.appendChild(makePayloadPre(responsePayload));

        item.appendChild(requestBubble);
        item.appendChild(responseBubble);
        historyEl.appendChild(item);
        historyEl.scrollTop = historyEl.scrollHeight;
      }

      function makeBubbleHeader(title, meta) {
        const header = document.createElement("div");
        header.className = "bubble-header";

        const left = document.createElement("div");
        left.className = "bubble-title";
        left.textContent = title;

        const right = document.createElement("div");
        right.style.display = "flex";
        right.style.gap = "8px";
        right.style.alignItems = "center";

        if (meta) {
          const metaEl = document.createElement("span");
          metaEl.className = "meta";
          metaEl.textContent = meta;
          right.appendChild(metaEl);
        }

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "Copy";
        copyBtn.addEventListener("click", () => {
          const root = header.parentElement;
          const pre = root ? root.querySelector("pre") : null;
          copyText(pre ? pre.textContent : "");
        });
        right.appendChild(copyBtn);

        header.appendChild(left);
        header.appendChild(right);
        return header;
      }

      function makePayloadPre(payload) {
        const pre = document.createElement("pre");
        pre.textContent = jsonPretty(payload);
        return pre;
      }

      function renderToolList() {
        toolListEl.innerHTML = "";
        for (const tool of state.filteredTools) {
          const button = document.createElement("button");
          button.className = "tool-btn" + (state.selectedTool && state.selectedTool.name === tool.name ? " active" : "");
          button.addEventListener("click", () => selectTool(tool.name));

          const top = document.createElement("div");
          top.className = "tool-row";

          const nameEl = document.createElement("div");
          nameEl.className = "tool-name";
          nameEl.textContent = tool.name;
          top.appendChild(nameEl);

          if (state.lastSuccessByTool[tool.name]) {
            const tag = document.createElement("span");
            tag.className = "tag ok";
            tag.textContent = "has working";
            top.appendChild(tag);
          }

          button.appendChild(top);

          const descEl = document.createElement("div");
          descEl.className = "tool-desc";
          descEl.textContent = tool.description || "No description";
          button.appendChild(descEl);

          toolListEl.appendChild(button);
        }

        toolCountEl.textContent = state.filteredTools.length + " shown / " + state.tools.length + " total";
      }

      function applyFilter() {
        const query = searchEl.value.trim().toLowerCase();
        state.filteredTools = query
          ? state.tools.filter((tool) =>
              tool.name.toLowerCase().includes(query) ||
              (tool.description || "").toLowerCase().includes(query)
            )
          : state.tools.slice();
        renderToolList();
      }

      function updateDetailsPanel() {
        if (!state.selectedTool) {
          detailToolNameEl.textContent = "";
          detailDescriptionEl.textContent = "";
          requiredFieldsEl.innerHTML = "";
          workingExampleStateEl.textContent = "No tool selected.";
          return;
        }

        const tool = state.selectedTool;
        detailToolNameEl.textContent = tool.name;
        detailDescriptionEl.textContent = tool.description || "No description";

        requiredFieldsEl.innerHTML = "";
        const required = getRequiredFields(tool);
        if (required.length === 0) {
          const li = document.createElement("li");
          li.textContent = "No required fields.";
          requiredFieldsEl.appendChild(li);
        } else {
          for (const key of required) {
            const li = document.createElement("li");
            li.innerHTML = "<span class=\\"mono\\">" + key + "</span>";
            requiredFieldsEl.appendChild(li);
          }
        }

        renderPayloadExamples(tool);

        if (state.lastSuccessByTool[tool.name]) {
          workingExampleStateEl.textContent = "Available. Use 'Last working example' for fast retry.";
          useLastWorkingBtn.disabled = false;
        } else {
          workingExampleStateEl.textContent = "Not available yet. Make a successful call once to store it.";
          useLastWorkingBtn.disabled = true;
        }
      }

      function setArgsEditor(value) {
        argsInputEl.value = jsonPretty(value);
      }

      function selectTool(toolName) {
        const tool = state.tools.find((item) => item.name === toolName);
        if (!tool) return;
        state.selectedTool = tool;
        selectedToolEl.value = tool.name;

        const last = state.lastSuccessByTool[tool.name];
        if (last) {
          setArgsEditor(last);
          statusEl.textContent = "Loaded last working example for " + tool.name;
        } else {
          setArgsEditor(buildRequiredPayloadExample(tool));
          statusEl.textContent = "Loaded required payload example for " + tool.name;
        }

        updateDetailsPanel();
        renderToolList();
      }

      function parseCurrentArgs() {
        const raw = argsInputEl.value.trim();
        return raw ? JSON.parse(raw) : {};
      }

      function useRequiredPayloadExample() {
        if (!state.selectedTool) return;
        setArgsEditor(buildRequiredPayloadExample(state.selectedTool));
        showToast("Required payload inserted");
      }

      function useFullPayloadExample() {
        if (!state.selectedTool) return;
        setArgsEditor(buildFullPayloadExample(state.selectedTool));
        showToast("Required + optional payload inserted");
      }

      function useLastWorkingExample() {
        if (!state.selectedTool) return;
        const args = state.lastSuccessByTool[state.selectedTool.name];
        if (!args) {
          showToast("No working example yet");
          return;
        }
        setArgsEditor(args);
        showToast("Working example inserted");
      }

      function formatEditorJson() {
        try {
          setArgsEditor(parseCurrentArgs());
          showToast("JSON formatted");
        } catch (error) {
          showToast("Invalid JSON");
          statusEl.textContent = "Invalid JSON: " + String(error);
        }
      }

      async function loadTools() {
        const response = await fetch("/api/tools");
        if (!response.ok) {
          throw new Error("Failed to load tools");
        }
        const payload = await response.json();
        if (!payload || !Array.isArray(payload.tools)) {
          throw new Error("Invalid tools payload");
        }
        state.tools = payload.tools.slice().sort((a, b) => a.name.localeCompare(b.name));
        state.filteredTools = state.tools.slice();
        renderToolList();
        if (state.tools.length > 0) {
          selectTool(state.tools[0].name);
          statusEl.textContent = String(state.tools.length) + " tools loaded.";
        } else {
          statusEl.textContent = "No tools found.";
        }
      }

      async function callSelectedTool() {
        if (!state.selectedTool) return;

        let args;
        try {
          args = parseCurrentArgs();
        } catch (error) {
          statusEl.textContent = "Invalid JSON arguments.";
          appendPair(state.selectedTool.name, {}, { error: String(error) }, "", true);
          return;
        }

        statusEl.textContent = "Calling " + state.selectedTool.name + "...";
        callBtn.disabled = true;

        try {
          const response = await fetch("/api/call", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ tool: state.selectedTool.name, args })
          });
          const payload = await response.json();

          if (!response.ok || !payload.ok) {
            const errorMeta = payload && typeof payload.durationMs === "number" ? payload.durationMs + " ms" : "";
            appendPair(state.selectedTool.name, args, payload, errorMeta, true);
            statusEl.textContent = "Call failed for " + state.selectedTool.name;
            return;
          }

          state.lastSuccessByTool[state.selectedTool.name] = args;
          saveLastSuccess();
          renderToolList();
          updateDetailsPanel();

          appendPair(
            state.selectedTool.name,
            args,
            payload.result,
            typeof payload.durationMs === "number" ? payload.durationMs + " ms" : "",
            false
          );
          statusEl.textContent = "Call succeeded for " + state.selectedTool.name;
        } catch (error) {
          appendPair(state.selectedTool.name, args, { error: String(error) }, "", true);
          statusEl.textContent = "Call failed for " + state.selectedTool.name;
        } finally {
          callBtn.disabled = false;
        }
      }

      state.lastSuccessByTool = loadLastSuccess();

      searchEl.addEventListener("input", applyFilter);
      callBtn.addEventListener("click", callSelectedTool);
      clearHistoryBtn.addEventListener("click", () => {
        historyEl.innerHTML = "";
      });
      formatArgsBtn.addEventListener("click", formatEditorJson);
      useRequiredExampleBtn.addEventListener("click", useRequiredPayloadExample);
      useFullExampleBtn.addEventListener("click", useFullPayloadExample);
      useLastWorkingBtn.addEventListener("click", useLastWorkingExample);
      applyRequiredPayloadBtn.addEventListener("click", useRequiredPayloadExample);
      applyFullPayloadBtn.addEventListener("click", useFullPayloadExample);

      argsInputEl.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          callSelectedTool();
        }
      });

      loadTools().catch((error) => {
        statusEl.textContent = "Failed to load tools: " + String(error);
      });
    </script>
  </body>
</html>
`;

async function main(): Promise<void> {
  loadDotEnvFile();

  const baseUrl = requiredEnv("ALLURE_TESTOPS_URL");
  const apiToken = requiredEnv("ALLURE_TOKEN");
  const defaultProjectId = parseOptionalProjectId(process.env.ALLURE_PROJECT_ID);
  const port = parsePort(process.env.DEV_UI_PORT);

  const tokenManager = new TokenManager({ baseUrl, apiToken });
  const client = new AllureApiClient({ baseUrl, tokenManager });
  const { tools, handlers } = buildToolRegistry(client, defaultProjectId);

  const server = createServer(async (req, res) => {
    const method = req.method ?? "";
    const path = req.url ?? "";

    if (method === "GET" && path === "/") {
      sendHtml(res, html);
      return;
    }

    if (method === "GET" && path === "/api/tools") {
      sendJson(res, 200, { tools });
      return;
    }

    if (method === "POST" && path === "/api/call") {
      const startedAt = Date.now();
      try {
        const body = await readRequestBody(req);
        const parsed = body ? JSON.parse(body) : {};
        if (!isRecord(parsed)) {
          sendJson(res, 400, { ok: false, error: "Request body must be a JSON object." });
          return;
        }

        const toolName = parsed.tool;
        const args = parsed.args;
        if (typeof toolName !== "string" || toolName.length === 0) {
          sendJson(res, 400, { ok: false, error: "Field 'tool' is required and must be a string." });
          return;
        }
        if (args !== undefined && !isRecord(args)) {
          sendJson(res, 400, { ok: false, error: "Field 'args' must be a JSON object when provided." });
          return;
        }

        const handler = handlers.get(toolName);
        if (!handler) {
          sendJson(res, 404, { ok: false, error: `Unknown tool: ${toolName}` });
          return;
        }

        const result = await handler(args ?? {});
        sendJson(res, 200, { ok: true, result, durationMs: Date.now() - startedAt });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        sendJson(res, 500, { ok: false, error: message, durationMs: Date.now() - startedAt });
      }
      return;
    }

    notFound(res);
  });

  server.listen(port, () => {
    console.error(`Allure MCP Local Debug UI started: http://localhost:${port}`);
  });
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Fatal startup error: ${message}`);
  process.exit(1);
});
