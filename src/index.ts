#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { createAllureClient, AllureClient } from './allure-client.js';
import { accessGroupControllerTools, handleAccessGroupControllerTool } from './controllers/access-group-controller.js';
import { accessGroupBulkControllerTools, handleAccessGroupBulkControllerTool } from './controllers/access-group-bulk-controller.js';
import { accountAdminControllerTools, handleAccountAdminControllerTool } from './controllers/account-admin-controller.js';
import { featureFlagControllerTools, handleFeatureFlagControllerTool } from './controllers/feature-flag-controller.js';
import { accountUserControllerTools, handleAccountUserControllerTool } from './controllers/account-user-controller.js';
import { accountManagementControllerTools, handleAccountManagementControllerTool } from './controllers/account-management-controller.js';
import { accountManagementBulkControllerTools, handleAccountManagementBulkControllerTool } from './controllers/account-management-bulk-controller.js';
import { analyticControllerTools, handleAnalyticControllerTool } from './controllers/analytic-controller.js';
import { businessMetricControllerTools, handleBusinessMetricControllerTool } from './controllers/business-metric-controller.js';
import { categoryControllerTools, handleCategoryControllerTool } from './controllers/category-controller.js';
import { categoryMatcherControllerTools, handleCategoryMatcherControllerTool } from './controllers/category-matcher-controller.js';
import { customFieldControllerTools, handleCustomFieldControllerTool } from './controllers/custom-field-controller.js';
import { customFieldBulkControllerTools, handleCustomFieldBulkControllerTool } from './controllers/custom-field-bulk-controller.js';
import { customFieldProjectControllerTools, handleCustomFieldProjectControllerTool } from './controllers/custom-field-project-controller.js';
import { customFieldSchemaControllerTools, handleCustomFieldSchemaControllerTool } from './controllers/custom-field-schema-controller.js';
import { customFieldValueControllerTools, handleCustomFieldValueControllerTool } from './controllers/custom-field-value-controller.js';
import { customFieldValueBulkControllerTools, handleCustomFieldValueBulkControllerTool } from './controllers/custom-field-value-bulk-controller.js';
import { cleanerSchemaControllerTools, handleCleanerSchemaControllerTool } from './controllers/cleaner-schema-controller.js';
import { cleanupControllerTools, handleCleanupControllerTool } from './controllers/cleanup-controller.js';
import { commentControllerTools, handleCommentControllerTool } from './controllers/comment-controller.js';
import { dashboardControllerTools, handleDashboardControllerTool } from './controllers/dashboard-controller.js';
import { dashboardTemplateControllerTools, handleDashboardTemplateControllerTool } from './controllers/dashboard-template-controller.js';
import { defectControllerTools, handleDefectControllerTool } from './controllers/defect-controller.js';
import { defectBulkControllerTools, handleDefectBulkControllerTool } from './controllers/defect-bulk-controller.js';
import { defectMatcherControllerTools, handleDefectMatcherControllerTool } from './controllers/defect-matcher-controller.js';
import { mailVerificationControllerTools, handleMailVerificationControllerTool } from './controllers/mail-verification-controller.js';
import { envVarControllerTools, handleEnvVarControllerTool } from './controllers/env-var-controller.js';
import { envVarSchemaControllerTools, handleEnvVarSchemaControllerTool } from './controllers/env-var-schema-controller.js';
import { envVarValueControllerTools, handleEnvVarValueControllerTool } from './controllers/env-var-value-controller.js';
import { exportRequestControllerTools, handleExportRequestControllerTool } from './controllers/export-request-controller.js';
import { exportControllerTools, handleExportControllerTool } from './controllers/export-controller.js';
import { filterControllerTools, handleFilterControllerTool } from './controllers/filter-controller.js';
import { globalSettingsControllerTools, handleGlobalSettingsControllerTool } from './controllers/global-settings-controller.js';
import { importRequestControllerTools, handleImportRequestControllerTool } from './controllers/import-request-controller.js';
import { integrationControllerTools, handleIntegrationControllerTool } from './controllers/integration-controller.js';
import { integrationExportControllerTools, handleIntegrationExportControllerTool } from './controllers/integration-export-controller.js';
import { integrationIssueControllerTools, handleIntegrationIssueControllerTool } from './controllers/integration-issue-controller.js';
import { integrationSelectControllerTools, handleIntegrationSelectControllerTool } from './controllers/integration-select-controller.js';
import { integrationTmsControllerTools, handleIntegrationTmsControllerTool } from './controllers/integration-tms-controller.js';
import { integrationWebhookControllerTools, handleIntegrationWebhookControllerTool } from './controllers/integration-webhook-controller.js';
import { inviteControllerTools, handleInviteControllerTool } from './controllers/invite-controller.js';
import { inviteBulkControllerTools, handleInviteBulkControllerTool } from './controllers/invite-bulk-controller.js';
import { issueControllerTools, handleIssueControllerTool } from './controllers/issue-controller.js';
import { issueSchemaControllerTools, handleIssueSchemaControllerTool } from './controllers/issue-schema-controller.js';
import { jobControllerTools, handleJobControllerTool } from './controllers/job-controller.js';
import { jobRunControllerTools, handleJobRunControllerTool } from './controllers/job-run-controller.js';
import { jobRunTestPlanControllerTools, handleJobRunTestPlanControllerTool } from './controllers/job-run-test-plan-controller.js';
import { launchControllerTools, handleLaunchControllerTool } from './controllers/launch-controller.js';
import { launchSearchControllerTools, handleLaunchSearchControllerTool } from './controllers/launch-search-controller.js';
import { launchDiffControllerTools, handleLaunchDiffControllerTool } from './controllers/launch-diff-controller.js';
import { launchIssueControllerTools, handleLaunchIssueControllerTool } from './controllers/launch-issue-controller.js';
import { launchTagControllerTools, handleLaunchTagControllerTool } from './controllers/launch-tag-controller.js';
import { launchUploadControllerTools, handleLaunchUploadControllerTool } from './controllers/launch-upload-controller.js';
import { licenseControllerTools, handleLicenseControllerTool } from './controllers/license-controller.js';
import { inviteLoginControllerTools, handleInviteLoginControllerTool } from './controllers/invite-login-controller.js';
import { authenticationControllerTools, handleAuthenticationControllerTool } from './controllers/authentication-controller.js';
import { markdownPreviewControllerTools, handleMarkdownPreviewControllerTool } from './controllers/markdown-preview-controller.js';
import { memberControllerTools, handleMemberControllerTool } from './controllers/member-controller.js';
import { mfaControllerTools, handleMfaControllerTool } from './controllers/mfa-controller.js';
import { asyncJobControllerTools, handleAsyncJobControllerTool } from './controllers/async-job-controller.js';
import { muteControllerTools, handleMuteControllerTool } from './controllers/mute-controller.js';
import { webhookControllerTools, handleWebhookControllerTool } from './controllers/webhook-controller.js';
import { permissionControllerTools, handlePermissionControllerTool } from './controllers/permission-controller.js';
import { permissionSetControllerTools, handlePermissionSetControllerTool } from './controllers/permission-set-controller.js';
import { projectControllerTools, handleProjectControllerTool } from './controllers/project-controller.js';
import { projectAccessControllerTools, handleProjectAccessControllerTool } from './controllers/project-access-controller.js';
import { testCaseTreeNodeMigrationControllerTools, handleTestCaseTreeNodeMigrationControllerTool } from './controllers/test-case-tree-node-migration-controller.js';
import { projectMetricControllerTools, handleProjectMetricControllerTool } from './controllers/project-metric-controller.js';
import { projectCollaboratorControllerTools, handleProjectCollaboratorControllerTool } from './controllers/project-collaborator-controller.js';
import { projectCategoryControllerTools, handleProjectCategoryControllerTool } from './controllers/project-category-controller.js';
import { projectCategoryMatcherControllerTools, handleProjectCategoryMatcherControllerTool } from './controllers/project-category-matcher-controller.js';
import { customFieldProjectControllerV2Tools, handleCustomFieldProjectControllerV2Tool } from './controllers/custom-field-project-controller-v-2.js';
import { customFieldValueProjectControllerTools, handleCustomFieldValueProjectControllerTool } from './controllers/custom-field-value-project-controller.js';
import { projectPropertyControllerTools, handleProjectPropertyControllerTool } from './controllers/project-property-controller.js';
import { projectSettingsControllerTools, handleProjectSettingsControllerTool } from './controllers/project-settings-controller.js';
import { registrationControllerTools, handleRegistrationControllerTool } from './controllers/registration-controller.js';
import { roleControllerTools, handleRoleControllerTool } from './controllers/role-controller.js';
import { roleSchemaControllerTools, handleRoleSchemaControllerTool } from './controllers/role-schema-controller.js';
import { sharedStepControllerTools, handleSharedStepControllerTool } from './controllers/shared-step-controller.js';
import { sharedStepAttachmentControllerTools, handleSharedStepAttachmentControllerTool } from './controllers/shared-step-attachment-controller.js';
import { sharedStepScenarioControllerTools, handleSharedStepScenarioControllerTool } from './controllers/shared-step-scenario-controller.js';
import { statusControllerTools, handleStatusControllerTool } from './controllers/status-controller.js';
import { blobStorageControllerTools, handleBlobStorageControllerTool } from './controllers/blob-storage-controller.js';
import { blobStorageUpgradeControllerTools, handleBlobStorageUpgradeControllerTool } from './controllers/blob-storage-upgrade-controller.js';
import { testTagControllerTools, handleTestTagControllerTool } from './controllers/test-tag-controller.js';
import { testCaseControllerTools, handleTestCaseControllerTool } from './controllers/test-case-controller.js';
import { testCaseSearchControllerTools, handleTestCaseSearchControllerTool } from './controllers/test-case-search-controller.js';
import { testCaseAttachmentControllerTools, handleTestCaseAttachmentControllerTool } from './controllers/test-case-attachment-controller.js';
import { testCaseAuditControllerTools, handleTestCaseAuditControllerTool } from './controllers/test-case-audit-controller.js';
import { testCaseBulkControllerTools, handleTestCaseBulkControllerTool } from './controllers/test-case-bulk-controller.js';
import { testCaseSyncControllerTools, handleTestCaseSyncControllerTool } from './controllers/test-case-sync-controller.js';
import { testCaseCustomFieldControllerTools, handleTestCaseCustomFieldControllerTool } from './controllers/test-case-custom-field-controller.js';
import { testCaseExampleControllerTools, handleTestCaseExampleControllerTool } from './controllers/test-case-example-controller.js';
import { testCaseCsvImportControllerTools, handleTestCaseCsvImportControllerTool } from './controllers/test-case-csv-import-controller.js';
import { testCaseScenarioControllerTools, handleTestCaseScenarioControllerTool } from './controllers/test-case-scenario-controller.js';
import { testCaseExportControllerTools, handleTestCaseExportControllerTool } from './controllers/test-case-export-controller.js';
import { testCaseVersionControllerTools, handleTestCaseVersionControllerTool } from './controllers/test-case-version-controller.js';
import { testCaseCloneControllerTools, handleTestCaseCloneControllerTool } from './controllers/test-case-clone-controller.js';
import { testCaseDefectControllerTools, handleTestCaseDefectControllerTool } from './controllers/test-case-defect-controller.js';
import { testCaseIssueControllerTools, handleTestCaseIssueControllerTool } from './controllers/test-case-issue-controller.js';
import { testCaseMembersControllerTools, handleTestCaseMembersControllerTool } from './controllers/test-case-members-controller.js';
import { testCaseOverviewControllerTools, handleTestCaseOverviewControllerTool } from './controllers/test-case-overview-controller.js';
import { testCaseRelationControllerTools, handleTestCaseRelationControllerTool } from './controllers/test-case-relation-controller.js';
import { testCaseTagControllerTools, handleTestCaseTagControllerTool } from './controllers/test-case-tag-controller.js';
import { testCaseTestKeyControllerTools, handleTestCaseTestKeyControllerTool } from './controllers/test-case-test-key-controller.js';
import { testCaseTreeControllerTools, handleTestCaseTreeControllerTool } from './controllers/test-case-tree-controller.js';
import { testCaseTreeSelectionControllerTools, handleTestCaseTreeSelectionControllerTool } from './controllers/test-case-tree-selection-controller.js';
import { testCaseUpdateSchemaControllerTools, handleTestCaseUpdateSchemaControllerTool } from './controllers/test-case-update-schema-controller.js';
import { testFixtureResultAttachmentControllerTools, handleTestFixtureResultAttachmentControllerTool } from './controllers/test-fixture-result-attachment-controller.js';
import { testKeyControllerTools, handleTestKeyControllerTool } from './controllers/test-key-controller.js';
import { testKeySchemaControllerTools, handleTestKeySchemaControllerTool } from './controllers/test-key-schema-controller.js';
import { testLayerControllerTools, handleTestLayerControllerTool } from './controllers/test-layer-controller.js';
import { testLayerSchemaControllerTools, handleTestLayerSchemaControllerTool } from './controllers/test-layer-schema-controller.js';
import { testPlanControllerTools, handleTestPlanControllerTool } from './controllers/test-plan-controller.js';
import { testResultControllerTools, handleTestResultControllerTool } from './controllers/test-result-controller.js';
import { testResultSearchControllerTools, handleTestResultSearchControllerTool } from './controllers/test-result-search-controller.js';
import { testResultAttachmentControllerTools, handleTestResultAttachmentControllerTool } from './controllers/test-result-attachment-controller.js';
import { testResultBulkControllerTools, handleTestResultBulkControllerTool } from './controllers/test-result-bulk-controller.js';
import { testResultDefectControllerTools, handleTestResultDefectControllerTool } from './controllers/test-result-defect-controller.js';
import { testResultRunControllerTools, handleTestResultRunControllerTool } from './controllers/test-result-run-controller.js';
import { testResultMuteControllerTools, handleTestResultMuteControllerTool } from './controllers/test-result-mute-controller.js';
import { testResultCustomFieldControllerTools, handleTestResultCustomFieldControllerTool } from './controllers/test-result-custom-field-controller.js';
import { testResultEnvVarControllerTools, handleTestResultEnvVarControllerTool } from './controllers/test-result-env-var-controller.js';
import { testResultFixtureControllerTools, handleTestResultFixtureControllerTool } from './controllers/test-result-fixture-controller.js';
import { testResultIssueControllerTools, handleTestResultIssueControllerTool } from './controllers/test-result-issue-controller.js';
import { testResultMembersControllerTools, handleTestResultMembersControllerTool } from './controllers/test-result-members-controller.js';
import { testResultRerunControllerTools, handleTestResultRerunControllerTool } from './controllers/test-result-rerun-controller.js';
import { testResultTestKeyControllerTools, handleTestResultTestKeyControllerTool } from './controllers/test-result-test-key-controller.js';
import { testResultTreeControllerTools, handleTestResultTreeControllerTool } from './controllers/test-result-tree-controller.js';
import { testResultTreeSelectionControllerTools, handleTestResultTreeSelectionControllerTool } from './controllers/test-result-tree-selection-controller.js';
import { apiTokenControllerTools, handleApiTokenControllerTool } from './controllers/api-token-controller.js';
import { treeControllerTools, handleTreeControllerTool } from './controllers/tree-controller.js';
import { treePathControllerTools, handleTreePathControllerTool } from './controllers/tree-path-controller.js';
import { uploadControllerTools, handleUploadControllerTool } from './controllers/upload-controller.js';
import { userControllerTools, handleUserControllerTool } from './controllers/user-controller.js';
import { testResultFlatControllerTools, handleTestResultFlatControllerTool } from './controllers/test-result-flat-controller.js';
import { testResultTreeControllerV2Tools, handleTestResultTreeControllerV2Tool } from './controllers/test-result-tree-controller-v-2.js';
import { testCaseFlatControllerTools, handleTestCaseFlatControllerTool } from './controllers/test-case-flat-controller.js';
import { testCaseTreeControllerV2Tools, handleTestCaseTreeControllerV2Tool } from './controllers/test-case-tree-controller-v-2.js';
import { testCaseCfBulkControllerTools, handleTestCaseCfBulkControllerTool } from './controllers/test-case-cf-bulk-controller.js';
import { testCaseCfvBulkControllerTools, handleTestCaseCfvBulkControllerTool } from './controllers/test-case-cfv-bulk-controller.js';
import { testCaseBulkControllerV2Tools, handleTestCaseBulkControllerV2Tool } from './controllers/test-case-bulk-controller-v-2.js';
import { testCaseExportBulkControllerTools, handleTestCaseExportBulkControllerTool } from './controllers/test-case-export-bulk-controller.js';
import { testCaseExternalLinkBulkControllerTools, handleTestCaseExternalLinkBulkControllerTool } from './controllers/test-case-external-link-bulk-controller.js';
import { testCaseIssueBulkControllerTools, handleTestCaseIssueBulkControllerTool } from './controllers/test-case-issue-bulk-controller.js';
import { testCaseRunBulkControllerTools, handleTestCaseRunBulkControllerTool } from './controllers/test-case-run-bulk-controller.js';
import { testCaseLayerBulkControllerTools, handleTestCaseLayerBulkControllerTool } from './controllers/test-case-layer-bulk-controller.js';
import { testCaseMemberBulkControllerTools, handleTestCaseMemberBulkControllerTool } from './controllers/test-case-member-bulk-controller.js';
import { testCaseMuteBulkControllerTools, handleTestCaseMuteBulkControllerTool } from './controllers/test-case-mute-bulk-controller.js';
import { testCaseStatusBulkControllerTools, handleTestCaseStatusBulkControllerTool } from './controllers/test-case-status-bulk-controller.js';
import { testCaseTagBulkControllerTools, handleTestCaseTagBulkControllerTool } from './controllers/test-case-tag-bulk-controller.js';
import { testCaseTestPlanBulkControllerTools, handleTestCaseTestPlanBulkControllerTool } from './controllers/test-case-test-plan-bulk-controller.js';
import { testCaseTreeBulkControllerV2Tools, handleTestCaseTreeBulkControllerV2Tool } from './controllers/test-case-tree-bulk-controller-v-2.js';
import { testResultStatusBulkControllerTools, handleTestResultStatusBulkControllerTool } from './controllers/test-result-status-bulk-controller.js';
import { testResultBulkControllerV2Tools, handleTestResultBulkControllerV2Tool } from './controllers/test-result-bulk-controller-v-2.js';
import { treeControllerV2Tools, handleTreeControllerV2Tool } from './controllers/tree-controller-v-2.js';
import { widgetControllerTools, handleWidgetControllerTool } from './controllers/widget-controller.js';
import { workflowControllerTools, handleWorkflowControllerTool } from './controllers/workflow-controller.js';
import { workflowSchemaControllerTools, handleWorkflowSchemaControllerTool } from './controllers/workflow-schema-controller.js';
import { injectJsControllerTools, handleInjectJsControllerTool } from './controllers/inject-js-controller.js';
import { testcaseallcontrollerTools, handleTestcaseAllControllerTool } from './controllers/testcase-all-controller.js';
import { launchallcontrollerTools, handleLaunchAllControllerTool } from './controllers/launch-all-controller.js';

// Environment variables
const ALLURE_TESTOPS_URL = process.env.ALLURE_TESTOPS_URL;
const ALLURE_TOKEN = process.env.ALLURE_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;

// Validate required environment variables
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

// Initialize Allure client with environment variables
const allureClient = createAllureClient(ALLURE_TESTOPS_URL, ALLURE_TOKEN);

// Tool handler type definition
type ToolHandler = (client: AllureClient, toolName: string, args: any, defaultProjectId: string) => Promise<string>;

// Tool registry: maps tool names to their handlers
interface ToolRegistry {
  tools: any[];
  handler: ToolHandler;
}

// Register all tool controllers
const toolControllers: ToolRegistry[] = [
  {
    tools: accessGroupControllerTools,
    handler: handleAccessGroupControllerTool,
  },
  {
    tools: accessGroupBulkControllerTools,
    handler: handleAccessGroupBulkControllerTool,
  },
  {
    tools: accountAdminControllerTools,
    handler: handleAccountAdminControllerTool,
  },
  {
    tools: featureFlagControllerTools,
    handler: handleFeatureFlagControllerTool,
  },
  {
    tools: accountUserControllerTools,
    handler: handleAccountUserControllerTool,
  },
  {
    tools: accountManagementControllerTools,
    handler: handleAccountManagementControllerTool,
  },
  {
    tools: accountManagementBulkControllerTools,
    handler: handleAccountManagementBulkControllerTool,
  },
  {
    tools: analyticControllerTools,
    handler: handleAnalyticControllerTool,
  },
  {
    tools: businessMetricControllerTools,
    handler: handleBusinessMetricControllerTool,
  },
  {
    tools: categoryControllerTools,
    handler: handleCategoryControllerTool,
  },
  {
    tools: categoryMatcherControllerTools,
    handler: handleCategoryMatcherControllerTool,
  },
  {
    tools: customFieldControllerTools,
    handler: handleCustomFieldControllerTool,
  },
  {
    tools: customFieldBulkControllerTools,
    handler: handleCustomFieldBulkControllerTool,
  },
  {
    tools: customFieldProjectControllerTools,
    handler: handleCustomFieldProjectControllerTool,
  },
  {
    tools: customFieldSchemaControllerTools,
    handler: handleCustomFieldSchemaControllerTool,
  },
  {
    tools: customFieldValueControllerTools,
    handler: handleCustomFieldValueControllerTool,
  },
  {
    tools: customFieldValueBulkControllerTools,
    handler: handleCustomFieldValueBulkControllerTool,
  },
  {
    tools: cleanerSchemaControllerTools,
    handler: handleCleanerSchemaControllerTool,
  },
  {
    tools: cleanupControllerTools,
    handler: handleCleanupControllerTool,
  },
  {
    tools: commentControllerTools,
    handler: handleCommentControllerTool,
  },
  {
    tools: dashboardControllerTools,
    handler: handleDashboardControllerTool,
  },
  {
    tools: dashboardTemplateControllerTools,
    handler: handleDashboardTemplateControllerTool,
  },
  {
    tools: defectControllerTools,
    handler: handleDefectControllerTool,
  },
  {
    tools: defectBulkControllerTools,
    handler: handleDefectBulkControllerTool,
  },
  {
    tools: defectMatcherControllerTools,
    handler: handleDefectMatcherControllerTool,
  },
  {
    tools: mailVerificationControllerTools,
    handler: handleMailVerificationControllerTool,
  },
  {
    tools: envVarControllerTools,
    handler: handleEnvVarControllerTool,
  },
  {
    tools: envVarSchemaControllerTools,
    handler: handleEnvVarSchemaControllerTool,
  },
  {
    tools: envVarValueControllerTools,
    handler: handleEnvVarValueControllerTool,
  },
  {
    tools: exportRequestControllerTools,
    handler: handleExportRequestControllerTool,
  },
  {
    tools: exportControllerTools,
    handler: handleExportControllerTool,
  },
  {
    tools: filterControllerTools,
    handler: handleFilterControllerTool,
  },
  {
    tools: globalSettingsControllerTools,
    handler: handleGlobalSettingsControllerTool,
  },
  {
    tools: importRequestControllerTools,
    handler: handleImportRequestControllerTool,
  },
  {
    tools: integrationControllerTools,
    handler: handleIntegrationControllerTool,
  },
  {
    tools: integrationExportControllerTools,
    handler: handleIntegrationExportControllerTool,
  },
  {
    tools: integrationIssueControllerTools,
    handler: handleIntegrationIssueControllerTool,
  },
  {
    tools: integrationSelectControllerTools,
    handler: handleIntegrationSelectControllerTool,
  },
  {
    tools: integrationTmsControllerTools,
    handler: handleIntegrationTmsControllerTool,
  },
  {
    tools: integrationWebhookControllerTools,
    handler: handleIntegrationWebhookControllerTool,
  },
  {
    tools: inviteControllerTools,
    handler: handleInviteControllerTool,
  },
  {
    tools: inviteBulkControllerTools,
    handler: handleInviteBulkControllerTool,
  },
  {
    tools: issueControllerTools,
    handler: handleIssueControllerTool,
  },
  {
    tools: issueSchemaControllerTools,
    handler: handleIssueSchemaControllerTool,
  },
  {
    tools: jobControllerTools,
    handler: handleJobControllerTool,
  },
  {
    tools: jobRunControllerTools,
    handler: handleJobRunControllerTool,
  },
  {
    tools: jobRunTestPlanControllerTools,
    handler: handleJobRunTestPlanControllerTool,
  },
  {
    tools: launchControllerTools,
    handler: handleLaunchControllerTool,
  },
  {
    tools: launchSearchControllerTools,
    handler: handleLaunchSearchControllerTool,
  },
  {
    tools: launchDiffControllerTools,
    handler: handleLaunchDiffControllerTool,
  },
  {
    tools: launchIssueControllerTools,
    handler: handleLaunchIssueControllerTool,
  },
  {
    tools: launchTagControllerTools,
    handler: handleLaunchTagControllerTool,
  },
  {
    tools: launchUploadControllerTools,
    handler: handleLaunchUploadControllerTool,
  },
  {
    tools: licenseControllerTools,
    handler: handleLicenseControllerTool,
  },
  {
    tools: inviteLoginControllerTools,
    handler: handleInviteLoginControllerTool,
  },
  {
    tools: authenticationControllerTools,
    handler: handleAuthenticationControllerTool,
  },
  {
    tools: markdownPreviewControllerTools,
    handler: handleMarkdownPreviewControllerTool,
  },
  {
    tools: memberControllerTools,
    handler: handleMemberControllerTool,
  },
  {
    tools: mfaControllerTools,
    handler: handleMfaControllerTool,
  },
  {
    tools: asyncJobControllerTools,
    handler: handleAsyncJobControllerTool,
  },
  {
    tools: muteControllerTools,
    handler: handleMuteControllerTool,
  },
  {
    tools: webhookControllerTools,
    handler: handleWebhookControllerTool,
  },
  {
    tools: permissionControllerTools,
    handler: handlePermissionControllerTool,
  },
  {
    tools: permissionSetControllerTools,
    handler: handlePermissionSetControllerTool,
  },
  {
    tools: projectControllerTools,
    handler: handleProjectControllerTool,
  },
  {
    tools: projectAccessControllerTools,
    handler: handleProjectAccessControllerTool,
  },
  {
    tools: testCaseTreeNodeMigrationControllerTools,
    handler: handleTestCaseTreeNodeMigrationControllerTool,
  },
  {
    tools: projectMetricControllerTools,
    handler: handleProjectMetricControllerTool,
  },
  {
    tools: projectCollaboratorControllerTools,
    handler: handleProjectCollaboratorControllerTool,
  },
  {
    tools: projectCategoryControllerTools,
    handler: handleProjectCategoryControllerTool,
  },
  {
    tools: projectCategoryMatcherControllerTools,
    handler: handleProjectCategoryMatcherControllerTool,
  },
  {
    tools: customFieldProjectControllerV2Tools,
    handler: handleCustomFieldProjectControllerV2Tool,
  },
  {
    tools: customFieldValueProjectControllerTools,
    handler: handleCustomFieldValueProjectControllerTool,
  },
  {
    tools: projectPropertyControllerTools,
    handler: handleProjectPropertyControllerTool,
  },
  {
    tools: projectSettingsControllerTools,
    handler: handleProjectSettingsControllerTool,
  },
  {
    tools: registrationControllerTools,
    handler: handleRegistrationControllerTool,
  },
  {
    tools: roleControllerTools,
    handler: handleRoleControllerTool,
  },
  {
    tools: roleSchemaControllerTools,
    handler: handleRoleSchemaControllerTool,
  },
  {
    tools: sharedStepControllerTools,
    handler: handleSharedStepControllerTool,
  },
  {
    tools: sharedStepAttachmentControllerTools,
    handler: handleSharedStepAttachmentControllerTool,
  },
  {
    tools: sharedStepScenarioControllerTools,
    handler: handleSharedStepScenarioControllerTool,
  },
  {
    tools: statusControllerTools,
    handler: handleStatusControllerTool,
  },
  {
    tools: blobStorageControllerTools,
    handler: handleBlobStorageControllerTool,
  },
  {
    tools: blobStorageUpgradeControllerTools,
    handler: handleBlobStorageUpgradeControllerTool,
  },
  {
    tools: testTagControllerTools,
    handler: handleTestTagControllerTool,
  },
  {
    tools: testCaseControllerTools,
    handler: handleTestCaseControllerTool,
  },
  {
    tools: testCaseSearchControllerTools,
    handler: handleTestCaseSearchControllerTool,
  },
  {
    tools: testCaseAttachmentControllerTools,
    handler: handleTestCaseAttachmentControllerTool,
  },
  {
    tools: testCaseAuditControllerTools,
    handler: handleTestCaseAuditControllerTool,
  },
  {
    tools: testCaseBulkControllerTools,
    handler: handleTestCaseBulkControllerTool,
  },
  {
    tools: testCaseSyncControllerTools,
    handler: handleTestCaseSyncControllerTool,
  },
  {
    tools: testCaseCustomFieldControllerTools,
    handler: handleTestCaseCustomFieldControllerTool,
  },
  {
    tools: testCaseExampleControllerTools,
    handler: handleTestCaseExampleControllerTool,
  },
  {
    tools: testCaseCsvImportControllerTools,
    handler: handleTestCaseCsvImportControllerTool,
  },
  {
    tools: testCaseScenarioControllerTools,
    handler: handleTestCaseScenarioControllerTool,
  },
  {
    tools: testCaseExportControllerTools,
    handler: handleTestCaseExportControllerTool,
  },
  {
    tools: testCaseVersionControllerTools,
    handler: handleTestCaseVersionControllerTool,
  },
  {
    tools: testCaseCloneControllerTools,
    handler: handleTestCaseCloneControllerTool,
  },
  {
    tools: testCaseDefectControllerTools,
    handler: handleTestCaseDefectControllerTool,
  },
  {
    tools: testCaseIssueControllerTools,
    handler: handleTestCaseIssueControllerTool,
  },
  {
    tools: testCaseMembersControllerTools,
    handler: handleTestCaseMembersControllerTool,
  },
  {
    tools: testCaseOverviewControllerTools,
    handler: handleTestCaseOverviewControllerTool,
  },
  {
    tools: testCaseRelationControllerTools,
    handler: handleTestCaseRelationControllerTool,
  },
  {
    tools: testCaseTagControllerTools,
    handler: handleTestCaseTagControllerTool,
  },
  {
    tools: testCaseTestKeyControllerTools,
    handler: handleTestCaseTestKeyControllerTool,
  },
  {
    tools: testCaseTreeControllerTools,
    handler: handleTestCaseTreeControllerTool,
  },
  {
    tools: testCaseTreeSelectionControllerTools,
    handler: handleTestCaseTreeSelectionControllerTool,
  },
  {
    tools: testCaseUpdateSchemaControllerTools,
    handler: handleTestCaseUpdateSchemaControllerTool,
  },
  {
    tools: testFixtureResultAttachmentControllerTools,
    handler: handleTestFixtureResultAttachmentControllerTool,
  },
  {
    tools: testKeyControllerTools,
    handler: handleTestKeyControllerTool,
  },
  {
    tools: testKeySchemaControllerTools,
    handler: handleTestKeySchemaControllerTool,
  },
  {
    tools: testLayerControllerTools,
    handler: handleTestLayerControllerTool,
  },
  {
    tools: testLayerSchemaControllerTools,
    handler: handleTestLayerSchemaControllerTool,
  },
  {
    tools: testPlanControllerTools,
    handler: handleTestPlanControllerTool,
  },
  {
    tools: testResultControllerTools,
    handler: handleTestResultControllerTool,
  },
  {
    tools: testResultSearchControllerTools,
    handler: handleTestResultSearchControllerTool,
  },
  {
    tools: testResultAttachmentControllerTools,
    handler: handleTestResultAttachmentControllerTool,
  },
  {
    tools: testResultBulkControllerTools,
    handler: handleTestResultBulkControllerTool,
  },
  {
    tools: testResultDefectControllerTools,
    handler: handleTestResultDefectControllerTool,
  },
  {
    tools: testResultRunControllerTools,
    handler: handleTestResultRunControllerTool,
  },
  {
    tools: testResultMuteControllerTools,
    handler: handleTestResultMuteControllerTool,
  },
  {
    tools: testResultCustomFieldControllerTools,
    handler: handleTestResultCustomFieldControllerTool,
  },
  {
    tools: testResultEnvVarControllerTools,
    handler: handleTestResultEnvVarControllerTool,
  },
  {
    tools: testResultFixtureControllerTools,
    handler: handleTestResultFixtureControllerTool,
  },
  {
    tools: testResultIssueControllerTools,
    handler: handleTestResultIssueControllerTool,
  },
  {
    tools: testResultMembersControllerTools,
    handler: handleTestResultMembersControllerTool,
  },
  {
    tools: testResultRerunControllerTools,
    handler: handleTestResultRerunControllerTool,
  },
  {
    tools: testResultTestKeyControllerTools,
    handler: handleTestResultTestKeyControllerTool,
  },
  {
    tools: testResultTreeControllerTools,
    handler: handleTestResultTreeControllerTool,
  },
  {
    tools: testResultTreeSelectionControllerTools,
    handler: handleTestResultTreeSelectionControllerTool,
  },
  {
    tools: apiTokenControllerTools,
    handler: handleApiTokenControllerTool,
  },
  {
    tools: treeControllerTools,
    handler: handleTreeControllerTool,
  },
  {
    tools: treePathControllerTools,
    handler: handleTreePathControllerTool,
  },
  {
    tools: uploadControllerTools,
    handler: handleUploadControllerTool,
  },
  {
    tools: userControllerTools,
    handler: handleUserControllerTool,
  },
  {
    tools: testResultFlatControllerTools,
    handler: handleTestResultFlatControllerTool,
  },
  {
    tools: testResultTreeControllerV2Tools,
    handler: handleTestResultTreeControllerV2Tool,
  },
  {
    tools: testCaseFlatControllerTools,
    handler: handleTestCaseFlatControllerTool,
  },
  {
    tools: testCaseTreeControllerV2Tools,
    handler: handleTestCaseTreeControllerV2Tool,
  },
  {
    tools: testCaseCfBulkControllerTools,
    handler: handleTestCaseCfBulkControllerTool,
  },
  {
    tools: testCaseCfvBulkControllerTools,
    handler: handleTestCaseCfvBulkControllerTool,
  },
  {
    tools: testCaseBulkControllerV2Tools,
    handler: handleTestCaseBulkControllerV2Tool,
  },
  {
    tools: testCaseExportBulkControllerTools,
    handler: handleTestCaseExportBulkControllerTool,
  },
  {
    tools: testCaseExternalLinkBulkControllerTools,
    handler: handleTestCaseExternalLinkBulkControllerTool,
  },
  {
    tools: testCaseIssueBulkControllerTools,
    handler: handleTestCaseIssueBulkControllerTool,
  },
  {
    tools: testCaseRunBulkControllerTools,
    handler: handleTestCaseRunBulkControllerTool,
  },
  {
    tools: testCaseLayerBulkControllerTools,
    handler: handleTestCaseLayerBulkControllerTool,
  },
  {
    tools: testCaseMemberBulkControllerTools,
    handler: handleTestCaseMemberBulkControllerTool,
  },
  {
    tools: testCaseMuteBulkControllerTools,
    handler: handleTestCaseMuteBulkControllerTool,
  },
  {
    tools: testCaseStatusBulkControllerTools,
    handler: handleTestCaseStatusBulkControllerTool,
  },
  {
    tools: testCaseTagBulkControllerTools,
    handler: handleTestCaseTagBulkControllerTool,
  },
  {
    tools: testCaseTestPlanBulkControllerTools,
    handler: handleTestCaseTestPlanBulkControllerTool,
  },
  {
    tools: testCaseTreeBulkControllerV2Tools,
    handler: handleTestCaseTreeBulkControllerV2Tool,
  },
  {
    tools: testResultStatusBulkControllerTools,
    handler: handleTestResultStatusBulkControllerTool,
  },
  {
    tools: testResultBulkControllerV2Tools,
    handler: handleTestResultBulkControllerV2Tool,
  },
  {
    tools: treeControllerV2Tools,
    handler: handleTreeControllerV2Tool,
  },
  {
    tools: widgetControllerTools,
    handler: handleWidgetControllerTool,
  },
  {
    tools: workflowControllerTools,
    handler: handleWorkflowControllerTool,
  },
  {
    tools: workflowSchemaControllerTools,
    handler: handleWorkflowSchemaControllerTool,
  },
  {
    tools: injectJsControllerTools,
    handler: handleInjectJsControllerTool,
  },
  {
    tools: testcaseallcontrollerTools,
    handler: handleTestcaseAllControllerTool,
  },
  {
    tools: launchallcontrollerTools,
    handler: handleLaunchAllControllerTool,
  },
];

// Build tool name to handler mapping
const toolHandlerMap = new Map<string, ToolHandler>();
const allTools: any[] = [];

for (const controller of toolControllers) {
  allTools.push(...controller.tools);
  for (const tool of controller.tools) {
    toolHandlerMap.set(tool.name, controller.handler);
  }
}

// Create MCP server
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

// Register tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools,
  };
});

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    // Look up handler for this tool
    const handler = toolHandlerMap.get(name);

    if (!handler) {
      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
    }

    // Execute the tool handler with default PROJECT_ID
    const result = await handler(allureClient, name, args, PROJECT_ID);

    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
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
  console.error(`Connected to: ${ALLURE_TESTOPS_URL}`);
  console.error(`Project ID: ${PROJECT_ID}`);
  console.error(`Registered ${allTools.length} tools`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
