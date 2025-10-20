import axios, { AxiosInstance } from 'axios';

// Import all controllers
import { TestCaseController } from './controllers/test-case-controller.js';
import { TestCaseSearchController } from './controllers/test-case-search-controller.js';
import { LaunchController } from './controllers/launch-controller.js';
import { TestPlanController } from './controllers/test-plan-controller.js';
import { ProjectController } from './controllers/project-controller.js';
import { TestResultController } from './controllers/test-result-controller.js';
import { DashboardController } from './controllers/dashboard-controller.js';
import { CustomFieldController } from './controllers/custom-field-controller.js';
import { MemberController } from './controllers/member-controller.js';
import { FilterController } from './controllers/filter-controller.js';
import { WidgetController } from './controllers/widget-controller.js';
import { CategoryController } from './controllers/category-controller.js';
import { TestLayerController } from './controllers/test-layer-controller.js';
import { TreeController } from './controllers/tree-controller.js';
import { UploadController } from './controllers/upload-controller.js';
import { LaunchSearchController } from './controllers/launch-search-controller.js';
import { TestResultSearchController } from './controllers/test-result-search-controller.js';
import { TestCaseAttachmentController } from './controllers/test-case-attachment-controller.js';
import { TestCaseTagController } from './controllers/test-case-tag-controller.js';
import { LaunchTagController } from './controllers/launch-tag-controller.js';
import { TestCaseBulkController } from './controllers/test-case-bulk-controller.js';
import { TestResultBulkController } from './controllers/test-result-bulk-controller.js';
import { CustomFieldValueController } from './controllers/custom-field-value-controller.js';
import { ProjectSettingsController } from './controllers/project-settings-controller.js';
import { LaunchDiffController } from './controllers/launch-diff-controller.js';
import { LaunchIssueController } from './controllers/launch-issue-controller.js';
import { LaunchUploadController } from './controllers/launch-upload-controller.js';
import { DashboardTemplateController } from './controllers/dashboard-template-controller.js';
import { TestCaseAuditController } from './controllers/test-case-audit-controller.js';
import { TestCaseSyncController } from './controllers/test-case-sync-controller.js';
import { TestCaseCustomFieldController } from './controllers/test-case-custom-field-controller.js';
import { TestResultCustomFieldController } from './controllers/test-result-custom-field-controller.js';
import { TestCaseCsvImportController } from './controllers/test-case-csv-import-controller.js';
import { TestCaseScenarioController } from './controllers/test-case-scenario-controller.js';
import { TestCaseExportController } from './controllers/test-case-export-controller.js';
import { TestCaseCloneController } from './controllers/test-case-clone-controller.js';
import { TestCaseOverviewController } from './controllers/test-case-overview-controller.js';
import { TestCaseTreeController } from './controllers/test-case-tree-controller.js';
import { TestCaseTreeSelectionController } from './controllers/test-case-tree-selection-controller.js';
import { ProjectAccessController } from './controllers/project-access-controller.js';
import { ProjectMetricController } from './controllers/project-metric-controller.js';
import { ProjectCollaboratorController } from './controllers/project-collaborator-controller.js';
import { ProjectCategoryController } from './controllers/project-category-controller.js';
import { ProjectPropertyController } from './controllers/project-property-controller.js';
import { CustomFieldProjectController } from './controllers/custom-field-project-controller.js';
import { CustomFieldSchemaController } from './controllers/custom-field-schema-controller.js';
import { CustomFieldValueBulkController } from './controllers/custom-field-value-bulk-controller.js';
import { TestCaseBulkControllerV2 } from './controllers/test-case-bulk-controller-v2.js';

export interface AllureConfig {
  baseUrl: string;
  token: string;
  projectId: string;
}

export class AllureClient {
  private client: AxiosInstance;
  private readonly projectId: string;

  // Controller instances
  public readonly testCase: TestCaseController;
  public readonly testCaseSearch: TestCaseSearchController;
  public readonly launch: LaunchController;
  public readonly testPlan: TestPlanController;
  public readonly project: ProjectController;
  public readonly testResult: TestResultController;
  public readonly dashboard: DashboardController;
  public readonly customField: CustomFieldController;
  public readonly member: MemberController;
  public readonly filter: FilterController;
  public readonly widget: WidgetController;
  public readonly category: CategoryController;
  public readonly testLayer: TestLayerController;
  public readonly tree: TreeController;
  public readonly upload: UploadController;
  public readonly launchSearch: LaunchSearchController;
  public readonly testResultSearch: TestResultSearchController;
  public readonly testCaseAttachment: TestCaseAttachmentController;
  public readonly testCaseTag: TestCaseTagController;
  public readonly launchTag: LaunchTagController;
  public readonly testCaseBulk: TestCaseBulkController;
  public readonly testResultBulk: TestResultBulkController;
  public readonly customFieldValue: CustomFieldValueController;
  public readonly projectSettings: ProjectSettingsController;
  public readonly launchDiff: LaunchDiffController;
  public readonly launchIssue: LaunchIssueController;
  public readonly launchUpload: LaunchUploadController;
  public readonly dashboardTemplate: DashboardTemplateController;
  public readonly testCaseAudit: TestCaseAuditController;
  public readonly testCaseSync: TestCaseSyncController;
  public readonly testCaseCustomField: TestCaseCustomFieldController;
  public readonly testResultCustomField: TestResultCustomFieldController;
  public readonly testCaseCsvImport: TestCaseCsvImportController;
  public readonly testCaseScenario: TestCaseScenarioController;
  public readonly testCaseExport: TestCaseExportController;
  public readonly testCaseClone: TestCaseCloneController;
  public readonly testCaseOverview: TestCaseOverviewController;
  public readonly testCaseTree: TestCaseTreeController;
  public readonly testCaseTreeSelection: TestCaseTreeSelectionController;
  public readonly projectAccess: ProjectAccessController;
  public readonly projectMetric: ProjectMetricController;
  public readonly projectCollaborator: ProjectCollaboratorController;
  public readonly projectCategory: ProjectCategoryController;
  public readonly projectProperty: ProjectPropertyController;
  public readonly customFieldProject: CustomFieldProjectController;
  public readonly customFieldSchema: CustomFieldSchemaController;
  public readonly customFieldValueBulk: CustomFieldValueBulkController;
  public readonly testCaseBulkV2: TestCaseBulkControllerV2;

  constructor(config: AllureConfig) {
    this.projectId = config.projectId;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Api-Token ${config.token}`,
        'Content-Type': 'application/json',
      },
    });

    // Initialize all controllers
    this.testCase = new TestCaseController(this.client, this.projectId);
    this.testCaseSearch = new TestCaseSearchController(this.client, this.projectId);
    this.launch = new LaunchController(this.client, this.projectId);
    this.testPlan = new TestPlanController(this.client, this.projectId);
    this.project = new ProjectController(this.client);
    this.testResult = new TestResultController(this.client, this.projectId);
    this.dashboard = new DashboardController(this.client, this.projectId);
    this.customField = new CustomFieldController(this.client, this.projectId);
    this.member = new MemberController(this.client, this.projectId);
    this.filter = new FilterController(this.client, this.projectId);
    this.widget = new WidgetController(this.client, this.projectId);
    this.category = new CategoryController(this.client, this.projectId);
    this.testLayer = new TestLayerController(this.client, this.projectId);
    this.tree = new TreeController(this.client, this.projectId);
    this.upload = new UploadController(this.client, this.projectId);
    this.launchSearch = new LaunchSearchController(this.client, this.projectId);
    this.testResultSearch = new TestResultSearchController(this.client, this.projectId);
    this.testCaseAttachment = new TestCaseAttachmentController(this.client);
    this.testCaseTag = new TestCaseTagController(this.client);
    this.launchTag = new LaunchTagController(this.client);
    this.testCaseBulk = new TestCaseBulkController(this.client);
    this.testResultBulk = new TestResultBulkController(this.client);
    this.customFieldValue = new CustomFieldValueController(this.client);
    this.projectSettings = new ProjectSettingsController(this.client, this.projectId);
    this.launchDiff = new LaunchDiffController(this.client);
    this.launchIssue = new LaunchIssueController(this.client);
    this.launchUpload = new LaunchUploadController(this.client, this.projectId);
    this.dashboardTemplate = new DashboardTemplateController(this.client);
    this.testCaseAudit = new TestCaseAuditController(this.client);
    this.testCaseSync = new TestCaseSyncController(this.client, this.projectId);
    this.testCaseCustomField = new TestCaseCustomFieldController(this.client);
    this.testResultCustomField = new TestResultCustomFieldController(this.client);
    this.testCaseCsvImport = new TestCaseCsvImportController(this.client, this.projectId);
    this.testCaseScenario = new TestCaseScenarioController(this.client);
    this.testCaseExport = new TestCaseExportController(this.client, this.projectId);
    this.testCaseClone = new TestCaseCloneController(this.client);
    this.testCaseOverview = new TestCaseOverviewController(this.client);
    this.testCaseTree = new TestCaseTreeController(this.client, this.projectId);
    this.testCaseTreeSelection = new TestCaseTreeSelectionController(this.client);
    this.projectAccess = new ProjectAccessController(this.client, this.projectId);
    this.projectMetric = new ProjectMetricController(this.client, this.projectId);
    this.projectCollaborator = new ProjectCollaboratorController(this.client, this.projectId);
    this.projectCategory = new ProjectCategoryController(this.client, this.projectId);
    this.projectProperty = new ProjectPropertyController(this.client, this.projectId);
    this.customFieldProject = new CustomFieldProjectController(this.client, this.projectId);
    this.customFieldSchema = new CustomFieldSchemaController(this.client);
    this.customFieldValueBulk = new CustomFieldValueBulkController(this.client);
    this.testCaseBulkV2 = new TestCaseBulkControllerV2(this.client);
  }

  // Backward compatibility methods - delegates to controllers
  async getTestCases(params?: any): Promise<any> {
    return this.testCase.getTestCases(params);
  }

  async getTestCase(id: number): Promise<any> {
    return this.testCase.getTestCase(id);
  }

  async createTestCase(testCase: any): Promise<any> {
    return this.testCase.createTestCase(testCase);
  }

  async updateTestCase(id: number, testCase: any): Promise<any> {
    return this.testCase.updateTestCase(id, testCase);
  }

  async deleteTestCase(id: number): Promise<void> {
    return this.testCase.deleteTestCase(id);
  }

  async bulkCreateTestCases(testCases: any[]): Promise<any> {
    return this.testCase.bulkCreateTestCases(testCases);
  }

  async searchTestCasesByAQL(aql: string, params?: any): Promise<any> {
    return this.testCaseSearch.searchTestCasesByAQL(aql, params);
  }

  async getLaunches(params?: any): Promise<any> {
    return this.launch.getLaunches(params);
  }

  async getLaunch(id: number): Promise<any> {
    return this.launch.getLaunch(id);
  }

  async createLaunch(launch: any): Promise<any> {
    return this.launch.createLaunch(launch);
  }

  async updateLaunch(id: number, launch: any): Promise<any> {
    return this.launch.updateLaunch(id, launch);
  }

  async deleteLaunch(id: number): Promise<void> {
    return this.launch.deleteLaunch(id);
  }

  async closeLaunch(id: number): Promise<any> {
    return this.launch.closeLaunch(id);
  }

  async getTestPlans(params?: any): Promise<any> {
    return this.testPlan.getTestPlans(params);
  }

  async getTestPlan(id: number): Promise<any> {
    return this.testPlan.getTestPlan(id);
  }

  async createTestPlan(testPlan: any): Promise<any> {
    return this.testPlan.createTestPlan(testPlan);
  }

  async updateTestPlan(id: number, testPlan: any): Promise<any> {
    return this.testPlan.updateTestPlan(id, testPlan);
  }

  async deleteTestPlan(id: number): Promise<void> {
    return this.testPlan.deleteTestPlan(id);
  }
}
