import { AxiosInstance } from 'axios';

export interface Dashboard {
  id?: number;
  name: string;
  description?: string;
  widgets?: any[];
}

export class DashboardController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getDashboards(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/dashboard`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getDashboard(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/dashboard/${id}`);
    return response.data;
  }

  async createDashboard(dashboard: Dashboard): Promise<any> {
    const response = await this.client.post(`/api/rs/dashboard`, {
      ...dashboard,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateDashboard(id: number, dashboard: Partial<Dashboard>): Promise<any> {
    const response = await this.client.patch(`/api/rs/dashboard/${id}`, dashboard);
    return response.data;
  }

  async deleteDashboard(id: number): Promise<void> {
    await this.client.delete(`/api/rs/dashboard/${id}`);
  }
}
