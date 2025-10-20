#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { AllureClient } from './allure-client.js';
import { parseTestCasesFromCSV } from './csv-parser.js';

// Get configuration from environment variables
const ALLURE_TESTOPS_URL = process.env.ALLURE_TESTOPS_URL;
const ALLURE_TOKEN = process.env.ALLURE_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;

if (!ALLURE_TOKEN) {
  console.error('Error: ALLURE_TOKEN environment variable is required');
  process.exit(1);
}

if (!ALLURE_TESTOPS_URL) {
  console.error('Error: ALLURE_TESTOPS_URL environment variable is required');
  process.exit(1);
}

if (!PROJECT_ID) {
  console.error('Error: PROJECT_ID environment variable is required');
  process.exit(1);
}

const allureClient = new AllureClient({
  baseUrl: ALLURE_TESTOPS_URL,
  token: ALLURE_TOKEN,
  projectId: PROJECT_ID,
});

const server = new Server(
  {
    name: 'allure-testops-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_test_cases',
        description: 'List all test cases in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_test_case',
        description: 'Get a specific test case by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test case ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_test_case',
        description: 'Create a new test case',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Test case name' },
            description: { type: 'string', description: 'Test case description' },
            status: { type: 'string', description: 'Test case status' },
            automated: { type: 'boolean', description: 'Is automated' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_test_case',
        description: 'Update an existing test case',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test case ID' },
            name: { type: 'string', description: 'Test case name' },
            description: { type: 'string', description: 'Test case description' },
            status: { type: 'string', description: 'Test case status' },
            automated: { type: 'boolean', description: 'Is automated' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_test_case',
        description: 'Delete a test case',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test case ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'bulk_create_test_cases_from_csv',
        description: 'Bulk create test cases from CSV content. CSV should have columns: name, description, status, automated',
        inputSchema: {
          type: 'object',
          properties: {
            csv_content: { type: 'string', description: 'CSV file content' },
          },
          required: ['csv_content'],
        },
      },
      {
        name: 'search_test_cases_by_aql',
        description: `Search test cases using Allure Query Language (AQL). AQL supports filtering by fields like name, tag, status, etc.

Examples:
- Find test cases by name: name = "My Test"
- Partial match: name ~= "test"
- Multiple conditions: name ~= "test" and createdBy = "John"
- Find by tag: tag = "smoke"
- Not equal: status != "passed"
- Numeric comparison: id >= 100
- Boolean field: automated = true
- Multiple values: name in ["Test 1", "Test 2"]
- Date range: createdDate > 1672531200000 and createdDate < 1704067200000
- Check null: role["Owner"] = null
- Negation: not name ~= "test"
- Complex query: (tag = "smoke" or tag = "regression") and status = "passed"

Supported operators: =, !=, ~=, >, <, >=, <=, and, or, not, in
Common fields: id, name, tag, issue, status, automation, createdDate, createdBy`,
        inputSchema: {
          type: 'object',
          properties: {
            aql: {
              type: 'string',
              description: 'AQL query string. See tool description for examples and syntax.'
            },
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
          required: ['aql'],
        },
      },
      {
        name: 'list_launches',
        description: 'List all launches in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_launch',
        description: 'Get a specific launch by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_launch',
        description: 'Create a new launch',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Launch name' },
            closed: { type: 'boolean', description: 'Is closed' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_launch',
        description: 'Update an existing launch',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
            name: { type: 'string', description: 'Launch name' },
            closed: { type: 'boolean', description: 'Is closed' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_launch',
        description: 'Delete a launch',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'close_launch',
        description: 'Close a launch',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Launch ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'list_test_plans',
        description: 'List all test plans in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_test_plan',
        description: 'Get a specific test plan by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test plan ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_test_plan',
        description: 'Create a new test plan',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Test plan name' },
            description: { type: 'string', description: 'Test plan description' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_test_plan',
        description: 'Update an existing test plan',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test plan ID' },
            name: { type: 'string', description: 'Test plan name' },
            description: { type: 'string', description: 'Test plan description' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_test_plan',
        description: 'Delete a test plan',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test plan ID' },
          },
          required: ['id'],
        },
      },
      // Test Case Attachment Tools
      {
        name: 'get_test_case_attachments',
        description: 'Get all attachments for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
          },
          required: ['testCaseId'],
        },
      },
      {
        name: 'get_test_case_attachment',
        description: 'Get a specific attachment for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            attachmentId: { type: 'number', description: 'Attachment ID' },
          },
          required: ['testCaseId', 'attachmentId'],
        },
      },
      {
        name: 'delete_test_case_attachment',
        description: 'Delete an attachment from a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            attachmentId: { type: 'number', description: 'Attachment ID' },
          },
          required: ['testCaseId', 'attachmentId'],
        },
      },
      // Test Case Tag Tools
      {
        name: 'get_test_case_tags',
        description: 'Get all tags for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
          },
          required: ['testCaseId'],
        },
      },
      {
        name: 'add_test_case_tag',
        description: 'Add a tag to a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            name: { type: 'string', description: 'Tag name' },
          },
          required: ['testCaseId', 'name'],
        },
      },
      {
        name: 'remove_test_case_tag',
        description: 'Remove a tag from a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            tagId: { type: 'number', description: 'Tag ID' },
          },
          required: ['testCaseId', 'tagId'],
        },
      },
      // Test Case Bulk Tools
      {
        name: 'bulk_update_test_cases',
        description: 'Bulk update multiple test cases',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseIds: { type: 'array', items: { type: 'number' }, description: 'Array of test case IDs' },
            update: { type: 'object', description: 'Update data to apply to all test cases' },
          },
          required: ['testCaseIds', 'update'],
        },
      },
      {
        name: 'bulk_delete_test_cases',
        description: 'Bulk delete multiple test cases',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseIds: { type: 'array', items: { type: 'number' }, description: 'Array of test case IDs to delete' },
          },
          required: ['testCaseIds'],
        },
      },
      {
        name: 'bulk_move_test_cases',
        description: 'Bulk move multiple test cases to a different tree location',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseIds: { type: 'array', items: { type: 'number' }, description: 'Array of test case IDs to move' },
            targetTreeId: { type: 'number', description: 'Target tree node ID' },
          },
          required: ['testCaseIds', 'targetTreeId'],
        },
      },
      // Test Case Export Tools
      {
        name: 'export_test_cases_to_csv',
        description: 'Export test cases to CSV format',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'export_test_cases_to_excel',
        description: 'Export test cases to Excel format',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'export_test_cases_to_json',
        description: 'Export test cases to JSON format',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      // Test Case Audit Tools
      {
        name: 'get_test_case_audit',
        description: 'Get audit trail for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
          },
          required: ['testCaseId'],
        },
      },
      // Test Case Clone Tools
      {
        name: 'clone_test_case',
        description: 'Clone a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID to clone' },
            name: { type: 'string', description: 'Name for the cloned test case (optional)' },
          },
          required: ['testCaseId'],
        },
      },
      // Test Case Overview Tools
      {
        name: 'get_test_case_overview',
        description: 'Get overview data for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
          },
          required: ['testCaseId'],
        },
      },
      // Launch Search Tools
      {
        name: 'search_launches',
        description: 'Search launches with a query string',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' },
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
          required: ['query'],
        },
      },
      // Launch Tag Tools
      {
        name: 'get_launch_tags',
        description: 'Get all tags for a launch',
        inputSchema: {
          type: 'object',
          properties: {
            launchId: { type: 'number', description: 'Launch ID' },
          },
          required: ['launchId'],
        },
      },
      {
        name: 'add_launch_tag',
        description: 'Add a tag to a launch',
        inputSchema: {
          type: 'object',
          properties: {
            launchId: { type: 'number', description: 'Launch ID' },
            name: { type: 'string', description: 'Tag name' },
          },
          required: ['launchId', 'name'],
        },
      },
      {
        name: 'remove_launch_tag',
        description: 'Remove a tag from a launch',
        inputSchema: {
          type: 'object',
          properties: {
            launchId: { type: 'number', description: 'Launch ID' },
            tagId: { type: 'number', description: 'Tag ID' },
          },
          required: ['launchId', 'tagId'],
        },
      },
      // Launch Diff Tools
      {
        name: 'get_launch_diff',
        description: 'Get diff between two launches',
        inputSchema: {
          type: 'object',
          properties: {
            launchId1: { type: 'number', description: 'First launch ID' },
            launchId2: { type: 'number', description: 'Second launch ID' },
          },
          required: ['launchId1', 'launchId2'],
        },
      },
      // Launch Issue Tools
      {
        name: 'get_launch_issues',
        description: 'Get issues linked to a launch',
        inputSchema: {
          type: 'object',
          properties: {
            launchId: { type: 'number', description: 'Launch ID' },
          },
          required: ['launchId'],
        },
      },
      {
        name: 'link_launch_issue',
        description: 'Link an issue to a launch',
        inputSchema: {
          type: 'object',
          properties: {
            launchId: { type: 'number', description: 'Launch ID' },
            issueKey: { type: 'string', description: 'Issue key (e.g., JIRA-123)' },
          },
          required: ['launchId', 'issueKey'],
        },
      },
      // Project Tools
      {
        name: 'list_projects',
        description: 'List all projects',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_project',
        description: 'Get a specific project by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Project ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_project',
        description: 'Create a new project',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Project name' },
            description: { type: 'string', description: 'Project description (optional)' },
            active: { type: 'boolean', description: 'Is active (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_project',
        description: 'Update an existing project',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Project ID' },
            name: { type: 'string', description: 'Project name (optional)' },
            description: { type: 'string', description: 'Project description (optional)' },
            active: { type: 'boolean', description: 'Is active (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_project',
        description: 'Delete a project',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Project ID' },
          },
          required: ['id'],
        },
      },
      // Project Settings Tools
      {
        name: 'get_project_settings',
        description: 'Get project settings',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'update_project_settings',
        description: 'Update project settings',
        inputSchema: {
          type: 'object',
          properties: {
            settings: { type: 'object', description: 'Settings object' },
          },
          required: ['settings'],
        },
      },
      // Project Metrics Tools
      {
        name: 'get_project_metrics',
        description: 'Get project metrics',
        inputSchema: {
          type: 'object',
          properties: {
            params: { type: 'object', description: 'Optional query parameters' },
          },
        },
      },
      // Custom Field Tools
      {
        name: 'list_custom_fields',
        description: 'List all custom fields',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_custom_field',
        description: 'Get a specific custom field by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Custom field ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_custom_field',
        description: 'Create a new custom field',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Custom field name' },
            type: { type: 'string', description: 'Field type (e.g., string, number, date)' },
            required: { type: 'boolean', description: 'Is required (optional)' },
          },
          required: ['name', 'type'],
        },
      },
      {
        name: 'update_custom_field',
        description: 'Update an existing custom field',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Custom field ID' },
            name: { type: 'string', description: 'Custom field name (optional)' },
            type: { type: 'string', description: 'Field type (optional)' },
            required: { type: 'boolean', description: 'Is required (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_custom_field',
        description: 'Delete a custom field',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Custom field ID' },
          },
          required: ['id'],
        },
      },
      // Test Result Tools
      {
        name: 'list_test_results',
        description: 'List test results',
        inputSchema: {
          type: 'object',
          properties: {
            launchId: { type: 'number', description: 'Launch ID (optional)' },
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_test_result',
        description: 'Get a specific test result by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test result ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'update_test_result',
        description: 'Update a test result',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test result ID' },
            status: { type: 'string', description: 'Test result status (optional)' },
            message: { type: 'string', description: 'Test result message (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'bulk_update_test_results',
        description: 'Bulk update multiple test results',
        inputSchema: {
          type: 'object',
          properties: {
            testResultIds: { type: 'array', items: { type: 'number' }, description: 'Array of test result IDs' },
            update: { type: 'object', description: 'Update data to apply' },
          },
          required: ['testResultIds', 'update'],
        },
      },
      {
        name: 'search_test_results',
        description: 'Search test results',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' },
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
          required: ['query'],
        },
      },
      // Dashboard Tools
      {
        name: 'list_dashboards',
        description: 'List all dashboards',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_dashboard',
        description: 'Get a specific dashboard by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Dashboard ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_dashboard',
        description: 'Create a new dashboard',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Dashboard name' },
            description: { type: 'string', description: 'Dashboard description (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_dashboard',
        description: 'Update an existing dashboard',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Dashboard ID' },
            name: { type: 'string', description: 'Dashboard name (optional)' },
            description: { type: 'string', description: 'Dashboard description (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_dashboard',
        description: 'Delete a dashboard',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Dashboard ID' },
          },
          required: ['id'],
        },
      },
      // Widget Tools
      {
        name: 'list_widgets',
        description: 'List all widgets for a dashboard',
        inputSchema: {
          type: 'object',
          properties: {
            dashboardId: { type: 'number', description: 'Dashboard ID' },
          },
          required: ['dashboardId'],
        },
      },
      {
        name: 'get_widget',
        description: 'Get a specific widget by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Widget ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_widget',
        description: 'Create a new widget',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Widget name' },
            type: { type: 'string', description: 'Widget type' },
            dashboardId: { type: 'number', description: 'Dashboard ID' },
          },
          required: ['name', 'type', 'dashboardId'],
        },
      },
      {
        name: 'update_widget',
        description: 'Update an existing widget',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Widget ID' },
            name: { type: 'string', description: 'Widget name (optional)' },
            configuration: { type: 'object', description: 'Widget configuration (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_widget',
        description: 'Delete a widget',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Widget ID' },
          },
          required: ['id'],
        },
      },
      // Member Tools
      {
        name: 'list_members',
        description: 'List all project members',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_member',
        description: 'Get a specific member by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Member ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'add_member',
        description: 'Add a member to the project',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
            role: { type: 'string', description: 'Member role' },
          },
          required: ['userId', 'role'],
        },
      },
      {
        name: 'update_member',
        description: 'Update a project member',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Member ID' },
            role: { type: 'string', description: 'Member role (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'remove_member',
        description: 'Remove a member from the project',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Member ID' },
          },
          required: ['id'],
        },
      },
      // Filter Tools
      {
        name: 'list_filters',
        description: 'List all filters in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_filter',
        description: 'Get a specific filter by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Filter ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_filter',
        description: 'Create a new filter',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Filter name' },
            query: { type: 'string', description: 'Filter query (optional)' },
            type: { type: 'string', description: 'Filter type (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_filter',
        description: 'Update an existing filter',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Filter ID' },
            name: { type: 'string', description: 'Filter name (optional)' },
            query: { type: 'string', description: 'Filter query (optional)' },
            type: { type: 'string', description: 'Filter type (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_filter',
        description: 'Delete a filter',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Filter ID' },
          },
          required: ['id'],
        },
      },
      // Category Tools
      {
        name: 'list_categories',
        description: 'List all categories in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_category',
        description: 'Get a specific category by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Category ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_category',
        description: 'Create a new category',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Category name' },
            description: { type: 'string', description: 'Category description (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_category',
        description: 'Update an existing category',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Category ID' },
            name: { type: 'string', description: 'Category name (optional)' },
            description: { type: 'string', description: 'Category description (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_category',
        description: 'Delete a category',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Category ID' },
          },
          required: ['id'],
        },
      },
      // Test Case Tree Tools
      {
        name: 'get_test_case_tree',
        description: 'Get the test case tree structure',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_test_case_tree_node',
        description: 'Get a specific test case tree node by ID',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: { type: 'number', description: 'Tree node ID' },
          },
          required: ['nodeId'],
        },
      },
      {
        name: 'create_test_case_tree_node',
        description: 'Create a new test case tree node',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Node name' },
            parentId: { type: 'number', description: 'Parent node ID (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_test_case_tree_node',
        description: 'Update an existing test case tree node',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: { type: 'number', description: 'Tree node ID' },
            name: { type: 'string', description: 'Node name (optional)' },
            parentId: { type: 'number', description: 'Parent node ID (optional)' },
          },
          required: ['nodeId'],
        },
      },
      {
        name: 'delete_test_case_tree_node',
        description: 'Delete a test case tree node',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: { type: 'number', description: 'Tree node ID' },
          },
          required: ['nodeId'],
        },
      },
      {
        name: 'move_test_case_tree_node',
        description: 'Move a test case tree node to a new parent',
        inputSchema: {
          type: 'object',
          properties: {
            nodeId: { type: 'number', description: 'Tree node ID to move' },
            newParentId: { type: 'number', description: 'New parent node ID' },
          },
          required: ['nodeId', 'newParentId'],
        },
      },
      // Test Case Scenario Tools
      {
        name: 'get_test_case_scenarios',
        description: 'Get all scenarios for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
          },
          required: ['testCaseId'],
        },
      },
      {
        name: 'get_test_case_scenario',
        description: 'Get a specific scenario for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            scenarioId: { type: 'number', description: 'Scenario ID' },
          },
          required: ['testCaseId', 'scenarioId'],
        },
      },
      {
        name: 'create_test_case_scenario',
        description: 'Create a new scenario for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            name: { type: 'string', description: 'Scenario name' },
            steps: { type: 'array', description: 'Scenario steps (optional)' },
          },
          required: ['testCaseId', 'name'],
        },
      },
      {
        name: 'update_test_case_scenario',
        description: 'Update an existing test case scenario',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            scenarioId: { type: 'number', description: 'Scenario ID' },
            name: { type: 'string', description: 'Scenario name (optional)' },
            steps: { type: 'array', description: 'Scenario steps (optional)' },
          },
          required: ['testCaseId', 'scenarioId'],
        },
      },
      {
        name: 'delete_test_case_scenario',
        description: 'Delete a test case scenario',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            scenarioId: { type: 'number', description: 'Scenario ID' },
          },
          required: ['testCaseId', 'scenarioId'],
        },
      },
      // Test Case Custom Field Tools
      {
        name: 'get_test_case_custom_fields',
        description: 'Get custom field values for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
          },
          required: ['testCaseId'],
        },
      },
      {
        name: 'set_test_case_custom_field',
        description: 'Set a custom field value for a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            customFieldId: { type: 'number', description: 'Custom field ID' },
            value: { description: 'Custom field value' },
          },
          required: ['testCaseId', 'customFieldId', 'value'],
        },
      },
      {
        name: 'delete_test_case_custom_field',
        description: 'Delete a custom field value from a test case',
        inputSchema: {
          type: 'object',
          properties: {
            testCaseId: { type: 'number', description: 'Test case ID' },
            customFieldId: { type: 'number', description: 'Custom field ID' },
          },
          required: ['testCaseId', 'customFieldId'],
        },
      },
      // Test Result Custom Field Tools
      {
        name: 'get_test_result_custom_fields',
        description: 'Get custom field values for a test result',
        inputSchema: {
          type: 'object',
          properties: {
            testResultId: { type: 'number', description: 'Test result ID' },
          },
          required: ['testResultId'],
        },
      },
      {
        name: 'set_test_result_custom_field',
        description: 'Set a custom field value for a test result',
        inputSchema: {
          type: 'object',
          properties: {
            testResultId: { type: 'number', description: 'Test result ID' },
            customFieldId: { type: 'number', description: 'Custom field ID' },
            value: { description: 'Custom field value' },
          },
          required: ['testResultId', 'customFieldId', 'value'],
        },
      },
      {
        name: 'delete_test_result_custom_field',
        description: 'Delete a custom field value from a test result',
        inputSchema: {
          type: 'object',
          properties: {
            testResultId: { type: 'number', description: 'Test result ID' },
            customFieldId: { type: 'number', description: 'Custom field ID' },
          },
          required: ['testResultId', 'customFieldId'],
        },
      },
      // Project Access Tools
      {
        name: 'get_project_access_rules',
        description: 'Get project access rules',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'add_project_access_rule',
        description: 'Add a project access rule',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
            permission: { type: 'string', description: 'Permission level' },
          },
          required: ['userId', 'permission'],
        },
      },
      {
        name: 'update_project_access_rule',
        description: 'Update a project access rule',
        inputSchema: {
          type: 'object',
          properties: {
            ruleId: { type: 'number', description: 'Access rule ID' },
            permission: { type: 'string', description: 'Permission level' },
          },
          required: ['ruleId', 'permission'],
        },
      },
      {
        name: 'delete_project_access_rule',
        description: 'Delete a project access rule',
        inputSchema: {
          type: 'object',
          properties: {
            ruleId: { type: 'number', description: 'Access rule ID' },
          },
          required: ['ruleId'],
        },
      },
      // Project Collaborator Tools
      {
        name: 'list_project_collaborators',
        description: 'List all project collaborators',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'add_project_collaborator',
        description: 'Add a collaborator to the project',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
            role: { type: 'string', description: 'Collaborator role' },
          },
          required: ['userId', 'role'],
        },
      },
      {
        name: 'remove_project_collaborator',
        description: 'Remove a collaborator from the project',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
          },
          required: ['userId'],
        },
      },
      // Dashboard Template Tools
      {
        name: 'list_dashboard_templates',
        description: 'List all dashboard templates',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_dashboard_template',
        description: 'Get a specific dashboard template by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Template ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_dashboard_template',
        description: 'Create a new dashboard template',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Template name' },
            description: { type: 'string', description: 'Template description (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_dashboard_template',
        description: 'Update an existing dashboard template',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Template ID' },
            name: { type: 'string', description: 'Template name (optional)' },
            description: { type: 'string', description: 'Template description (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_dashboard_template',
        description: 'Delete a dashboard template',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Template ID' },
          },
          required: ['id'],
        },
      },
      // Test Case Tree Selection Tools
      {
        name: 'select_test_cases_from_tree_node',
        description: 'Get test cases in a specific tree node',
        inputSchema: {
          type: 'object',
          properties: {
            treeNodeId: { type: 'number', description: 'Tree node ID' },
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
          required: ['treeNodeId'],
        },
      },
      {
        name: 'select_all_test_cases_from_tree_node',
        description: 'Get all test cases from a tree node, optionally including child nodes',
        inputSchema: {
          type: 'object',
          properties: {
            treeNodeId: { type: 'number', description: 'Tree node ID' },
            recursive: { type: 'boolean', description: 'Include child nodes (optional, default: false)' },
          },
          required: ['treeNodeId'],
        },
      },
      // Test Layer Tools
      {
        name: 'list_test_layers',
        description: 'List all test layers in the project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_test_layer',
        description: 'Get a specific test layer by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test layer ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_test_layer',
        description: 'Create a new test layer',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Test layer name' },
            description: { type: 'string', description: 'Test layer description (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_test_layer',
        description: 'Update an existing test layer',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test layer ID' },
            name: { type: 'string', description: 'Test layer name (optional)' },
            description: { type: 'string', description: 'Test layer description (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_test_layer',
        description: 'Delete a test layer',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Test layer ID' },
          },
          required: ['id'],
        },
      },
      // Tree Tools (generic tree browsing)
      {
        name: 'browse_test_case_tree',
        description: 'Browse the test case tree structure (alternative tree view)',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'browse_test_case_tree_node',
        description: 'Browse a specific test case tree node (alternative tree view)',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Tree node ID' },
          },
          required: ['id'],
        },
      },
      // Project Category Tools
      {
        name: 'list_project_categories',
        description: 'List all categories for the current project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_project_category',
        description: 'Get a specific project category by ID',
        inputSchema: {
          type: 'object',
          properties: {
            categoryId: { type: 'number', description: 'Category ID' },
          },
          required: ['categoryId'],
        },
      },
      {
        name: 'create_project_category',
        description: 'Create a new project category',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Category name' },
            description: { type: 'string', description: 'Category description (optional)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'update_project_category',
        description: 'Update an existing project category',
        inputSchema: {
          type: 'object',
          properties: {
            categoryId: { type: 'number', description: 'Category ID' },
            name: { type: 'string', description: 'Category name (optional)' },
            description: { type: 'string', description: 'Category description (optional)' },
          },
          required: ['categoryId'],
        },
      },
      {
        name: 'delete_project_category',
        description: 'Delete a project category',
        inputSchema: {
          type: 'object',
          properties: {
            categoryId: { type: 'number', description: 'Category ID' },
          },
          required: ['categoryId'],
        },
      },
      // Project Property Tools
      {
        name: 'list_project_properties',
        description: 'List all properties for the current project',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_project_property',
        description: 'Get a specific project property by key',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'Property key' },
          },
          required: ['key'],
        },
      },
      {
        name: 'set_project_property',
        description: 'Set a project property (create or update)',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'Property key' },
            value: { description: 'Property value' },
          },
          required: ['key', 'value'],
        },
      },
      {
        name: 'update_project_property',
        description: 'Update an existing project property value',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'Property key' },
            value: { description: 'New property value' },
          },
          required: ['key', 'value'],
        },
      },
      {
        name: 'delete_project_property',
        description: 'Delete a project property',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string', description: 'Property key' },
          },
          required: ['key'],
        },
      },
      // Custom Field Project Tools
      {
        name: 'list_project_custom_fields',
        description: 'List custom fields assigned to the current project',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'assign_custom_field_to_project',
        description: 'Assign a custom field to the current project',
        inputSchema: {
          type: 'object',
          properties: {
            customFieldId: { type: 'number', description: 'Custom field ID' },
          },
          required: ['customFieldId'],
        },
      },
      {
        name: 'unassign_custom_field_from_project',
        description: 'Unassign a custom field from the current project',
        inputSchema: {
          type: 'object',
          properties: {
            customFieldId: { type: 'number', description: 'Custom field ID' },
          },
          required: ['customFieldId'],
        },
      },
      // Custom Field Schema Tools
      {
        name: 'list_custom_field_schemas',
        description: 'List all custom field schemas',
        inputSchema: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'Page number (optional)' },
            size: { type: 'number', description: 'Page size (optional)' },
          },
        },
      },
      {
        name: 'get_custom_field_schema',
        description: 'Get a specific custom field schema by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Schema ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_custom_field_schema',
        description: 'Create a new custom field schema',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Schema name' },
            type: { type: 'string', description: 'Schema type' },
            entityType: { type: 'string', description: 'Entity type (e.g., testcase, testresult)' },
            schema: { type: 'object', description: 'Schema definition (optional)' },
          },
          required: ['name', 'type', 'entityType'],
        },
      },
      {
        name: 'update_custom_field_schema',
        description: 'Update an existing custom field schema',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Schema ID' },
            name: { type: 'string', description: 'Schema name (optional)' },
            type: { type: 'string', description: 'Schema type (optional)' },
            entityType: { type: 'string', description: 'Entity type (optional)' },
            schema: { type: 'object', description: 'Schema definition (optional)' },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_custom_field_schema',
        description: 'Delete a custom field schema',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Schema ID' },
          },
          required: ['id'],
        },
      },
      // Custom Field Value Bulk Tools
      {
        name: 'bulk_set_custom_field_values',
        description: 'Bulk set custom field values for multiple entities',
        inputSchema: {
          type: 'object',
          properties: {
            entityType: { type: 'string', description: 'Entity type (e.g., testcase, testresult)' },
            entityIds: { type: 'array', items: { type: 'number' }, description: 'Array of entity IDs' },
            customFieldId: { type: 'number', description: 'Custom field ID' },
            value: { description: 'Value to set' },
          },
          required: ['entityType', 'entityIds', 'customFieldId', 'value'],
        },
      },
      {
        name: 'bulk_delete_custom_field_values',
        description: 'Bulk delete custom field values from multiple entities',
        inputSchema: {
          type: 'object',
          properties: {
            entityType: { type: 'string', description: 'Entity type (e.g., testcase, testresult)' },
            entityIds: { type: 'array', items: { type: 'number' }, description: 'Array of entity IDs' },
            customFieldId: { type: 'number', description: 'Custom field ID' },
          },
          required: ['entityType', 'entityIds', 'customFieldId'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'list_test_cases': {
        const result = await allureClient.getTestCases(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_case': {
        const result = await allureClient.getTestCase((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_case': {
        const result = await allureClient.createTestCase(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_case': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.updateTestCase(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_case': {
        await allureClient.deleteTestCase((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Test case ${(args as any)?.id} deleted successfully` }],
        };
      }

      case 'bulk_create_test_cases_from_csv': {
        const testCases = parseTestCasesFromCSV((args as any)?.csv_content);
        const results = await allureClient.bulkCreateTestCases(testCases);
        return {
          content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
        };
      }

      case 'search_test_cases_by_aql': {
        const { aql, ...otherParams } = args as any;
        const result = await allureClient.searchTestCasesByAQL(aql, otherParams);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'list_launches': {
        const result = await allureClient.getLaunches(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_launch': {
        const result = await allureClient.getLaunch((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_launch': {
        const result = await allureClient.createLaunch(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_launch': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.updateLaunch(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_launch': {
        await allureClient.deleteLaunch((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Launch ${(args as any)?.id} deleted successfully` }],
        };
      }

      case 'close_launch': {
        const result = await allureClient.closeLaunch((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'list_test_plans': {
        const result = await allureClient.getTestPlans(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_plan': {
        const result = await allureClient.getTestPlan((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_plan': {
        const result = await allureClient.createTestPlan(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_plan': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.updateTestPlan(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_plan': {
        await allureClient.deleteTestPlan((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Test plan ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Test Case Attachment Cases
      case 'get_test_case_attachments': {
        const result = await allureClient.testCaseAttachment.getAttachments((args as any)?.testCaseId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_case_attachment': {
        const result = await allureClient.testCaseAttachment.getAttachment(
          (args as any)?.testCaseId,
          (args as any)?.attachmentId
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_case_attachment': {
        await allureClient.testCaseAttachment.deleteAttachment(
          (args as any)?.testCaseId,
          (args as any)?.attachmentId
        );
        return {
          content: [{ type: 'text', text: `Attachment deleted successfully` }],
        };
      }

      // Test Case Tag Cases
      case 'get_test_case_tags': {
        const result = await allureClient.testCaseTag.getTags((args as any)?.testCaseId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'add_test_case_tag': {
        const { testCaseId, name } = args as any;
        const result = await allureClient.testCaseTag.addTag(testCaseId, { name });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'remove_test_case_tag': {
        await allureClient.testCaseTag.removeTag((args as any)?.testCaseId, (args as any)?.tagId);
        return {
          content: [{ type: 'text', text: `Tag removed successfully` }],
        };
      }

      // Test Case Bulk Cases
      case 'bulk_update_test_cases': {
        const { testCaseIds, update } = args as any;
        const result = await allureClient.testCaseBulk.bulkUpdateTestCases(testCaseIds, update);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'bulk_delete_test_cases': {
        const result = await allureClient.testCaseBulk.bulkDeleteTestCases((args as any)?.testCaseIds);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'bulk_move_test_cases': {
        const { testCaseIds, targetTreeId } = args as any;
        const result = await allureClient.testCaseBulk.bulkMoveTestCases(testCaseIds, targetTreeId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Test Case Export Cases
      case 'export_test_cases_to_csv': {
        const result = await allureClient.testCaseExport.exportToCsv(args || {});
        return {
          content: [{ type: 'text', text: 'CSV export completed. Binary data returned.' }],
        };
      }

      case 'export_test_cases_to_excel': {
        const result = await allureClient.testCaseExport.exportToExcel(args || {});
        return {
          content: [{ type: 'text', text: 'Excel export completed. Binary data returned.' }],
        };
      }

      case 'export_test_cases_to_json': {
        const result = await allureClient.testCaseExport.exportToJson(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Test Case Audit Cases
      case 'get_test_case_audit': {
        const result = await allureClient.testCaseAudit.getAuditLog((args as any)?.testCaseId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Test Case Clone Cases
      case 'clone_test_case': {
        const { testCaseId, name } = args as any;
        const result = await allureClient.testCaseClone.cloneTestCase(testCaseId, name);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Test Case Overview Cases
      case 'get_test_case_overview': {
        const result = await allureClient.testCaseOverview.getOverview((args as any)?.testCaseId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Launch Search Cases
      case 'search_launches': {
        const { query, ...otherParams } = args as any;
        const result = await allureClient.launchSearch.searchLaunches(query, otherParams);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Launch Tag Cases
      case 'get_launch_tags': {
        const result = await allureClient.launchTag.getTags((args as any)?.launchId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'add_launch_tag': {
        const { launchId, name } = args as any;
        const result = await allureClient.launchTag.addTag(launchId, { name });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'remove_launch_tag': {
        await allureClient.launchTag.removeTag((args as any)?.launchId, (args as any)?.tagId);
        return {
          content: [{ type: 'text', text: `Tag removed successfully` }],
        };
      }

      // Launch Diff Cases
      case 'get_launch_diff': {
        const { launchId1, launchId2 } = args as any;
        const result = await allureClient.launchDiff.compareLaunches(launchId1, launchId2);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Launch Issue Cases
      case 'get_launch_issues': {
        const result = await allureClient.launchIssue.getIssues((args as any)?.launchId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'link_launch_issue': {
        const { launchId, issueKey } = args as any;
        const result = await allureClient.launchIssue.linkIssue(launchId, issueKey);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Project Cases
      case 'list_projects': {
        const result = await allureClient.project.getProjects(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_project': {
        const result = await allureClient.project.getProject((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_project': {
        const result = await allureClient.project.createProject(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_project': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.project.updateProject(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_project': {
        await allureClient.project.deleteProject((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Project ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Project Settings Cases
      case 'get_project_settings': {
        const result = await allureClient.projectSettings.getSettings();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_project_settings': {
        const result = await allureClient.projectSettings.updateSettings((args as any)?.settings);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Project Metrics Cases
      case 'get_project_metrics': {
        const result = await allureClient.projectMetric.getMetrics((args as any)?.params);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Custom Field Cases
      case 'list_custom_fields': {
        const result = await allureClient.customField.getCustomFields(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_custom_field': {
        const result = await allureClient.customField.getCustomField((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_custom_field': {
        const result = await allureClient.customField.createCustomField(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_custom_field': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.customField.updateCustomField(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_custom_field': {
        await allureClient.customField.deleteCustomField((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Custom field ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Test Result Cases
      case 'list_test_results': {
        const result = await allureClient.testResult.getTestResults(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_result': {
        const result = await allureClient.testResult.getTestResult((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_result': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.testResult.updateTestResult(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'bulk_update_test_results': {
        const { testResultIds, update } = args as any;
        const result = await allureClient.testResultBulk.bulkUpdateTestResults(testResultIds, update);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'search_test_results': {
        const { query, ...otherParams } = args as any;
        const result = await allureClient.testResultSearch.searchTestResults(query, otherParams);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Dashboard Cases
      case 'list_dashboards': {
        const result = await allureClient.dashboard.getDashboards(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_dashboard': {
        const result = await allureClient.dashboard.getDashboard((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_dashboard': {
        const result = await allureClient.dashboard.createDashboard(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_dashboard': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.dashboard.updateDashboard(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_dashboard': {
        await allureClient.dashboard.deleteDashboard((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Dashboard ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Widget Cases
      case 'list_widgets': {
        const dashboardId = (args as any)?.dashboardId;
        if (!dashboardId) {
          return {
            content: [{ type: 'text', text: 'Error: dashboardId is required to list widgets' }],
            isError: true,
          };
        }
        const result = await allureClient.widget.getWidgets(dashboardId, args);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_widget': {
        const result = await allureClient.widget.getWidget((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_widget': {
        const result = await allureClient.widget.createWidget(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_widget': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.widget.updateWidget(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_widget': {
        await allureClient.widget.deleteWidget((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Widget ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Member Cases
      case 'list_members': {
        const result = await allureClient.member.getMembers(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_member': {
        const result = await allureClient.member.getMember((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'add_member': {
        const result = await allureClient.member.addMember(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_member': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.member.updateMember(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'remove_member': {
        await allureClient.member.removeMember((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Member ${(args as any)?.id} removed successfully` }],
        };
      }

      // Filter Cases
      case 'list_filters': {
        const result = await allureClient.filter.getFilters(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_filter': {
        const result = await allureClient.filter.getFilter((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_filter': {
        const result = await allureClient.filter.createFilter(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_filter': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.filter.updateFilter(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_filter': {
        await allureClient.filter.deleteFilter((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Filter ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Category Cases
      case 'list_categories': {
        const result = await allureClient.category.getCategories(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_category': {
        const result = await allureClient.category.getCategory((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_category': {
        const result = await allureClient.category.createCategory(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_category': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.category.updateCategory(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_category': {
        await allureClient.category.deleteCategory((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Category ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Test Case Tree Cases
      case 'get_test_case_tree': {
        const result = await allureClient.testCaseTree.getTree(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_case_tree_node': {
        const result = await allureClient.testCaseTree.getTreeNode((args as any)?.nodeId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_case_tree_node': {
        const result = await allureClient.testCaseTree.createTreeNode(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_case_tree_node': {
        const { nodeId, ...updateData } = args as any;
        const result = await allureClient.testCaseTree.updateTreeNode(nodeId, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_case_tree_node': {
        await allureClient.testCaseTree.deleteTreeNode((args as any)?.nodeId);
        return {
          content: [{ type: 'text', text: `Tree node ${(args as any)?.nodeId} deleted successfully` }],
        };
      }

      case 'move_test_case_tree_node': {
        const { nodeId, newParentId } = args as any;
        const result = await allureClient.testCaseTree.moveTreeNode(nodeId, newParentId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Test Case Scenario Cases
      case 'get_test_case_scenarios': {
        const result = await allureClient.testCaseScenario.getScenarios((args as any)?.testCaseId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_case_scenario': {
        const { testCaseId, scenarioId } = args as any;
        const result = await allureClient.testCaseScenario.getScenario(testCaseId, scenarioId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_case_scenario': {
        const { testCaseId, ...scenarioData } = args as any;
        const result = await allureClient.testCaseScenario.createScenario(testCaseId, scenarioData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_case_scenario': {
        const { testCaseId, scenarioId, ...updateData } = args as any;
        const result = await allureClient.testCaseScenario.updateScenario(testCaseId, scenarioId, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_case_scenario': {
        const { testCaseId, scenarioId } = args as any;
        await allureClient.testCaseScenario.deleteScenario(testCaseId, scenarioId);
        return {
          content: [{ type: 'text', text: `Scenario deleted successfully` }],
        };
      }

      // Test Case Custom Field Cases
      case 'get_test_case_custom_fields': {
        const result = await allureClient.testCaseCustomField.getCustomFields((args as any)?.testCaseId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'set_test_case_custom_field': {
        const { testCaseId, customFieldId, value } = args as any;
        const result = await allureClient.testCaseCustomField.setCustomField(testCaseId, customFieldId, value);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_case_custom_field': {
        const { testCaseId, customFieldId } = args as any;
        await allureClient.testCaseCustomField.deleteCustomField(testCaseId, customFieldId);
        return {
          content: [{ type: 'text', text: `Custom field deleted successfully` }],
        };
      }

      // Test Result Custom Field Cases
      case 'get_test_result_custom_fields': {
        const result = await allureClient.testResultCustomField.getCustomFields((args as any)?.testResultId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'set_test_result_custom_field': {
        const { testResultId, customFieldId, value } = args as any;
        const result = await allureClient.testResultCustomField.setCustomField(testResultId, customFieldId, value);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_result_custom_field': {
        const { testResultId, customFieldId } = args as any;
        await allureClient.testResultCustomField.deleteCustomField(testResultId, customFieldId);
        return {
          content: [{ type: 'text', text: `Custom field deleted successfully` }],
        };
      }

      // Project Access Cases
      case 'get_project_access_rules': {
        const result = await allureClient.projectAccess.getAccessRules();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'add_project_access_rule': {
        const result = await allureClient.projectAccess.addAccessRule(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_project_access_rule': {
        const { ruleId, ...updateData } = args as any;
        const result = await allureClient.projectAccess.updateAccessRule(ruleId, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_project_access_rule': {
        await allureClient.projectAccess.deleteAccessRule((args as any)?.ruleId);
        return {
          content: [{ type: 'text', text: `Access rule deleted successfully` }],
        };
      }

      // Project Collaborator Cases
      case 'list_project_collaborators': {
        const result = await allureClient.projectCollaborator.getCollaborators(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'add_project_collaborator': {
        const result = await allureClient.projectCollaborator.addCollaborator(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'remove_project_collaborator': {
        await allureClient.projectCollaborator.removeCollaborator((args as any)?.userId);
        return {
          content: [{ type: 'text', text: `Collaborator removed successfully` }],
        };
      }

      // Dashboard Template Cases
      case 'list_dashboard_templates': {
        const result = await allureClient.dashboardTemplate.getTemplates(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_dashboard_template': {
        const result = await allureClient.dashboardTemplate.getTemplate((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_dashboard_template': {
        const result = await allureClient.dashboardTemplate.createTemplate(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_dashboard_template': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.dashboardTemplate.updateTemplate(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_dashboard_template': {
        await allureClient.dashboardTemplate.deleteTemplate((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Dashboard template ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Test Case Tree Selection Cases
      case 'select_test_cases_from_tree_node': {
        const { treeNodeId, ...params } = args as any;
        const result = await allureClient.testCaseTreeSelection.selectTestCases(treeNodeId, params);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'select_all_test_cases_from_tree_node': {
        const { treeNodeId, recursive = false } = args as any;
        const result = await allureClient.testCaseTreeSelection.selectAllTestCases(treeNodeId, recursive);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Test Layer Cases
      case 'list_test_layers': {
        const result = await allureClient.testLayer.getTestLayers(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_test_layer': {
        const result = await allureClient.testLayer.getTestLayer((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_test_layer': {
        const result = await allureClient.testLayer.createTestLayer(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_test_layer': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.testLayer.updateTestLayer(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_test_layer': {
        await allureClient.testLayer.deleteTestLayer((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Test layer ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Tree Cases
      case 'browse_test_case_tree': {
        const result = await allureClient.tree.getTestCaseTree(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'browse_test_case_tree_node': {
        const result = await allureClient.tree.getTestCaseTreeNode((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      // Project Category Cases
      case 'list_project_categories': {
        const result = await allureClient.projectCategory.getCategories(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_project_category': {
        const result = await allureClient.projectCategory.getCategory((args as any)?.categoryId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_project_category': {
        const result = await allureClient.projectCategory.createCategory(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_project_category': {
        const { categoryId, ...updateData } = args as any;
        const result = await allureClient.projectCategory.updateCategory(categoryId, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_project_category': {
        await allureClient.projectCategory.deleteCategory((args as any)?.categoryId);
        return {
          content: [{ type: 'text', text: `Project category deleted successfully` }],
        };
      }

      // Project Property Cases
      case 'list_project_properties': {
        const result = await allureClient.projectProperty.getProperties();
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_project_property': {
        const result = await allureClient.projectProperty.getProperty((args as any)?.key);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'set_project_property': {
        const { key, value } = args as any;
        const result = await allureClient.projectProperty.setProperty({ key, value });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_project_property': {
        const { key, value } = args as any;
        const result = await allureClient.projectProperty.updateProperty(key, value);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_project_property': {
        await allureClient.projectProperty.deleteProperty((args as any)?.key);
        return {
          content: [{ type: 'text', text: `Project property deleted successfully` }],
        };
      }

      // Custom Field Project Cases
      case 'list_project_custom_fields': {
        const result = await allureClient.customFieldProject.getProjectCustomFields(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'assign_custom_field_to_project': {
        const result = await allureClient.customFieldProject.assignCustomField((args as any)?.customFieldId);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'unassign_custom_field_from_project': {
        await allureClient.customFieldProject.unassignCustomField((args as any)?.customFieldId);
        return {
          content: [{ type: 'text', text: `Custom field unassigned successfully` }],
        };
      }

      // Custom Field Schema Cases
      case 'list_custom_field_schemas': {
        const result = await allureClient.customFieldSchema.getSchemas(args || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'get_custom_field_schema': {
        const result = await allureClient.customFieldSchema.getSchema((args as any)?.id);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'create_custom_field_schema': {
        const result = await allureClient.customFieldSchema.createSchema(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'update_custom_field_schema': {
        const { id, ...updateData } = args as any;
        const result = await allureClient.customFieldSchema.updateSchema(id, updateData);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'delete_custom_field_schema': {
        await allureClient.customFieldSchema.deleteSchema((args as any)?.id);
        return {
          content: [{ type: 'text', text: `Custom field schema ${(args as any)?.id} deleted successfully` }],
        };
      }

      // Custom Field Value Bulk Cases
      case 'bulk_set_custom_field_values': {
        const { entityType, entityIds, customFieldId, value } = args as any;
        const result = await allureClient.customFieldValueBulk.bulkSetCustomFieldValues(
          entityType,
          entityIds,
          customFieldId,
          value
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'bulk_delete_custom_field_values': {
        const { entityType, entityIds, customFieldId } = args as any;
        const result = await allureClient.customFieldValueBulk.bulkDeleteCustomFieldValues(
          entityType,
          entityIds,
          customFieldId
        );
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}\n${error.response?.data ? JSON.stringify(error.response.data, null, 2) : ''}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Allure TestOps MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
