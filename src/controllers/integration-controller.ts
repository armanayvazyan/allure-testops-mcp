import { AxiosInstance } from 'axios';

export interface Integration {
  id?: number;
  name: string;
  type: string;
  config?: any;
}

export class IntegrationController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  // Global integrations
  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/integration`, { params });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/${id}`);
    return response.data;
  }

  async create(integration: Integration): Promise<any> {
    const response = await this.client.post(`/api/rs/integration`, integration);
    return response.data;
  }

  async update(id: number, integration: Partial<Integration>): Promise<any> {
    const response = await this.client.patch(`/api/rs/integration/${id}`, integration);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/integration/${id}`);
  }

  // Project-specific integrations
  async getProjectIntegrations(projectId?: string, params?: any): Promise<any> {
    const pid = projectId || this.projectId;
    const response = await this.client.get(`/api/rs/integration/project/${pid}`, { params });
    return response.data;
  }

  async getProjectIntegration(projectId: string, integrationId: number): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/project/${projectId}/${integrationId}`);
    return response.data;
  }

  async createProjectIntegration(projectId: string, integration: Integration): Promise<any> {
    const response = await this.client.post(`/api/rs/integration/project/${projectId}`, integration);
    return response.data;
  }

  async updateProjectIntegration(projectId: string, integrationId: number, integration: Partial<Integration>): Promise<any> {
    const response = await this.client.patch(`/api/rs/integration/project/${projectId}/${integrationId}`, integration);
    return response.data;
  }

  async deleteProjectIntegration(projectId: string, integrationId: number): Promise<void> {
    await this.client.delete(`/api/rs/integration/project/${projectId}/${integrationId}`);
  }

  // Issue tracking operations
  async getIssues(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/issue`, { params });
    return response.data;
  }

  async createIssue(issueData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/integration/issue`, issueData);
    return response.data;
  }

  async getIssue(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/issue/${id}`);
    return response.data;
  }

  async updateIssue(id: number, issueData: any): Promise<any> {
    const response = await this.client.patch(`/api/rs/integration/issue/${id}`, issueData);
    return response.data;
  }

  async deleteIssue(id: number): Promise<void> {
    await this.client.delete(`/api/rs/integration/issue/${id}`);
  }

  // Export configurations
  async getExports(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/export`, { params });
    return response.data;
  }

  async createExport(exportData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/integration/export`, exportData);
    return response.data;
  }

  async getExport(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/export/${id}`);
    return response.data;
  }

  async updateExport(id: number, exportData: any): Promise<any> {
    const response = await this.client.patch(`/api/rs/integration/export/${id}`, exportData);
    return response.data;
  }

  async deleteExport(id: number): Promise<void> {
    await this.client.delete(`/api/rs/integration/export/${id}`);
  }

  // Webhook management
  async getWebhooks(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/webhook`, { params });
    return response.data;
  }

  async createWebhook(webhookData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/integration/webhook`, webhookData);
    return response.data;
  }

  async getWebhook(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/integration/webhook/${id}`);
    return response.data;
  }

  async updateWebhook(id: number, webhookData: any): Promise<any> {
    const response = await this.client.patch(`/api/rs/integration/webhook/${id}`, webhookData);
    return response.data;
  }

  async deleteWebhook(id: number): Promise<void> {
    await this.client.delete(`/api/rs/integration/webhook/${id}`);
  }

  // Validate integration settings
  async validate(validationData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/integration/validate`, validationData);
    return response.data;
  }
}
