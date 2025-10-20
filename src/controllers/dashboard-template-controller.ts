import { AxiosInstance } from 'axios';

export interface DashboardTemplate {
  id?: number;
  name: string;
  description?: string;
  config?: any;
}

export class DashboardTemplateController {
  constructor(private client: AxiosInstance) {}

  async getTemplates(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/dashboard/template`, { params });
    return response.data;
  }

  async getTemplate(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/dashboard/template/${id}`);
    return response.data;
  }

  async createTemplate(template: DashboardTemplate): Promise<any> {
    const response = await this.client.post(`/api/rs/dashboard/template`, template);
    return response.data;
  }

  async updateTemplate(id: number, template: Partial<DashboardTemplate>): Promise<any> {
    const response = await this.client.patch(`/api/rs/dashboard/template/${id}`, template);
    return response.data;
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.client.delete(`/api/rs/dashboard/template/${id}`);
  }
}
